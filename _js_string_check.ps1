$text = Get-Content app.js -Raw
$line = 1
$errors = New-Object System.Collections.Generic.List[string]

$stack = New-Object System.Collections.Generic.List[object]
$stack.Add([pscustomobject]@{ kind='code'; templateExpr=$false; braceDepth=0; startLine=1 })

function Top($stackRef){ return $stackRef[$stackRef.Count-1] }

for($i=0; $i -lt $text.Length; $i++){
  $ch = [int][char]$text[$i]
  $next = if($i+1 -lt $text.Length){ [int][char]$text[$i+1] } else { -1 }
  $state = Top $stack

  if($ch -eq 10){
    if($state.kind -eq 'linecomment'){
      $stack.RemoveAt($stack.Count-1)
    } elseif($state.kind -eq 'single' -or $state.kind -eq 'double'){
      $errors.Add(("Line {0}: unterminated {1} string" -f $state.startLine, $state.kind))
      $stack.RemoveAt($stack.Count-1)
    }
    $line++
    continue
  }

  switch($state.kind){
    'linecomment' { continue }
    'blockcomment' {
      if($ch -eq 42 -and $next -eq 47){
        $stack.RemoveAt($stack.Count-1)
        $i++
      }
      continue
    }
    'single' {
      if($ch -eq 92){ $i++; continue }
      if($ch -eq 39){ $stack.RemoveAt($stack.Count-1) }
      continue
    }
    'double' {
      if($ch -eq 92){ $i++; continue }
      if($ch -eq 34){ $stack.RemoveAt($stack.Count-1) }
      continue
    }
    'template' {
      if($ch -eq 92){ $i++; continue }
      if($ch -eq 96){ $stack.RemoveAt($stack.Count-1); continue }
      if($ch -eq 36 -and $next -eq 123){
        $stack.Add([pscustomobject]@{ kind='code'; templateExpr=$true; braceDepth=1; startLine=$line })
        $i++
      }
      continue
    }
    'code' {
      if($ch -eq 47 -and $next -eq 47){
        $stack.Add([pscustomobject]@{ kind='linecomment'; startLine=$line })
        $i++
        continue
      }
      if($ch -eq 47 -and $next -eq 42){
        $stack.Add([pscustomobject]@{ kind='blockcomment'; startLine=$line })
        $i++
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

foreach($state in $stack){
  if($state.kind -eq 'single' -or $state.kind -eq 'double'){
    $errors.Add(("EOF: unterminated {0} string started line {1}" -f $state.kind, $state.startLine))
  }
}

$errors | Select-Object -First 200
