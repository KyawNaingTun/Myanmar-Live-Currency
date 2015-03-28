<?php
$currency_rate = file_get_contents("http://forex.cbm.gov.mm/api/latest/") ;
echo $currency_rate ;
?>