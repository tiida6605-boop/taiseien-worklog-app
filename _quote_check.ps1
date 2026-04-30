$text = Get-Content app.js -Raw
$state = 'code'
$line = 1
$errors = @()
$quoteStart = 0
for ($i = 0; $i -lt $text.Length; $i++) {
  $ch = [int][char]$text[$i]
  $next = if ($i + 1 -lt $text.Length) { [int][char]$text[$i + 1] } else { 0 }

  if ($ch -eq 10) {
    if ($state -eq 'linecomment') {
      $state = 'code'
    } elseif ($state -eq 'single' -or $state -eq 'double') {
      $errors += ("Line {0}: unterminated {1} string" -f $quoteStart, $state)
      $state = 'code'
    }
    $line++
    continue
  }

  switch ($state) {
    'code' {
      if ($ch -eq 47 -and $next -eq 47) { $state = 'linecomment'; $i++; continue }
      if ($ch -eq 47 -and $next -eq 42) { $state = 'blockcomment'; $i++; continue }
      if ($ch -eq 34) { $state = 'double'; $quoteStart = $line; continue }
      if ($ch -eq 39) { $state = 'single'; $quoteStart = $line; continue }
      if ($ch -eq 96) { $state = 'template'; continue }
    }
    'blockcomment' {
      if ($ch -eq 42 -and $next -eq 47) { $state = 'code'; $i++; continue }
    }
    'single' {
      if ($ch -eq 92) { $i++; continue }
      if ($ch -eq 39) { $state = 'code'; continue }
    }
    'double' {
      if ($ch -eq 92) { $i++; continue }
      if ($ch -eq 34) { $state = 'code'; continue }
    }
    'template' {
      if ($ch -eq 92) { $i++; continue }
      if ($ch -eq 96) { $state = 'code'; continue }
    }
  }
}
if ($state -eq 'single' -or $state -eq 'double') {
  $errors += ("EOF: unterminated {0} string started line {1}" -f $state, $quoteStart)
}
$errors | Select-Object -First 200
