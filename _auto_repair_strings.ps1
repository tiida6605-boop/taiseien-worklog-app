$inputPath = 'app.js'
$text = Get-Content $inputPath -Raw
$line = 1
$out = New-Object System.Text.StringBuilder
$repairs = New-Object System.Collections.Generic.List[string]

$stack = New-Object System.Collections.Generic.List[object]
$stack.Add([pscustomobject]@{ kind='code'; templateExpr=$false; braceDepth=0; startLine=1 })

function Top($s){ return $s[$s.Count-1] }

for($i=0; $i -lt $text.Length; $i++){
  $chObj = $text[$i]
  $ch = [int][char]$chObj
  $next = if($i+1 -lt $text.Length){ [int][char]$text[$i+1] } else { -1 }
  $state = Top $stack

  if($ch -eq 10){
    if($state.kind -eq 'linecomment'){
      $stack.RemoveAt($stack.Count-1)
    } elseif($state.kind -eq 'single' -or $state.kind -eq 'double'){
      $quoteChar = if($state.kind -eq 'single'){"'"} else {'"'}
      [void]$out.Append($quoteChar)
      $repairs.Add(("line {0}: closed unterminated {1} string" -f $state.startLine, $state.kind))
      $stack.RemoveAt($stack.Count-1)
    }
    [void]$out.Append([char]10)
    $line++
    continue
  }

  [void]$out.Append($chObj)

  switch($state.kind){
    'linecomment' { continue }
    'blockcomment' {
      if($ch -eq 42 -and $next -eq 47){
        [void]$out.Append($text[$i+1])
        $i++
        $stack.RemoveAt($stack.Count-1)
      }
      continue
    }
    'single' {
      if($ch -eq 92){
        if($i+1 -lt $text.Length){ [void]$out.Append($text[$i+1]); $i++ }
        continue
      }
      if($ch -eq 39){ $stack.RemoveAt($stack.Count-1) }
      continue
    }
    'double' {
      if($ch -eq 92){
        if($i+1 -lt $text.Length){ [void]$out.Append($text[$i+1]); $i++ }
        continue
      }
      if($ch -eq 34){ $stack.RemoveAt($stack.Count-1) }
      continue
    }
    'template' {
      if($ch -eq 92){
        if($i+1 -lt $text.Length){ [void]$out.Append($text[$i+1]); $i++ }
        continue
      }
      if($ch -eq 96){ $stack.RemoveAt($stack.Count-1); continue }
      if($ch -eq 36 -and $next -eq 123){
        [void]$out.Append($text[$i+1])
        $i++
        $stack.Add([pscustomobject]@{ kind='code'; templateExpr=$true; braceDepth=1; startLine=$line })
      }
      continue
    }
    'code' {
      if($ch -eq 47 -and $next -eq 47){
        [void]$out.Append($text[$i+1])
        $i++
        $stack.Add([pscustomobject]@{ kind='linecomment'; startLine=$line })
        continue
      }
      if($ch -eq 47 -and $next -eq 42){
        [void]$out.Append($text[$i+1])
        $i++
        $stack.Add([pscustomobject]@{ kind='blockcomment'; startLine=$line })
        continue
      }
      if($ch -eq 39){
        $stack.Add([pscustomobject]@{ kind='single'; startLine=$line })
        continue
      }
      if($ch -eq 34){
        $stack.Add([pscustomobject]@{ kind='double'; startLine=$line })
        continue
      }
      if($ch -eq 96){
        $stack.Add([pscustomobject]@{ kind='template'; startLine=$line })
        continue
      }

      if($state.templateExpr){
        if($ch -eq 123){
          $state.braceDepth++
          $stack[$stack.Count-1] = $state
          continue
        }
        if($ch -eq 125){
          $state.braceDepth--
          if($state.braceDepth -le 0){
            $stack.RemoveAt($stack.Count-1)
          } else {
            $stack[$stack.Count-1] = $state
          }
          continue
        }
      }
    }
  }
}

Set-Content $inputPath $out.ToString() -Encoding UTF8
$repairs | Select-Object -First 40
"Repairs: $($repairs.Count)"
