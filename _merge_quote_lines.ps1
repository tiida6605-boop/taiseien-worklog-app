$lines = Get-Content app.js
$fixed = New-Object System.Collections.Generic.List[string]
$merged = 0
foreach($line in $lines){
  if($line.Trim() -eq '"' -and $fixed.Count -gt 0){
    $prev = $fixed[$fixed.Count - 1]
    if($prev -notmatch '"\s*$'){
      $fixed[$fixed.Count - 1] = $prev + '"'
      $merged++
      continue
    }
  }
  $fixed.Add($line)
}
Set-Content app.js $fixed -Encoding UTF8
"MergedQuoteLines: $merged"
