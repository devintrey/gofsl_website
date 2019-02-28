<?php
echo "<html><body><p>Unfortunately we encountered an issue trying to load our normal load board.  We are looking into this issue and hope to have it resolved ASAP.  In the meantime, here is a raw output of our load board data.</p><table>\n\n";
$f = fopen("https://docs.google.com/spreadsheet/pub?key=0Aqk-H-cY1pcDdDc0UUFQR3FvNGNQUnViVmVMejNPQ2c&single=true&gid=0&output=csv", "r");
while (($line = fgetcsv($f)) !== false) {
        echo "<tr>";
        foreach ($line as $cell) {
                echo "<td>" . htmlspecialchars($cell) . "</td>";
        }
        echo "</tr>\n";
}
fclose($f);
echo "\n</table></body></html>";