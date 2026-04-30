$path='app.js'
$text=Get-Content $path -Raw
$start='/* Legacy payroll render block (kept for reference, disabled in favor of updated implementation below)'
$end='function sortEntriesByMetric(entries, metric = "hours", sortOrder = "desc") {'
$startIndex = $text.IndexOf($start)
if($startIndex -lt 0){ throw 'start marker not found' }
$endIndex = $text.IndexOf($end, $startIndex)
if($endIndex -lt 0){ throw 'end marker not found' }
$newText = $text.Substring(0,$startIndex) + $end + $text.Substring($endIndex + $end.Length)
Set-Content $path $newText -Encoding UTF8
"Removed legacy payroll block"
