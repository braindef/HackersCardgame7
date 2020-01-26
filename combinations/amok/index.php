
<h1>Pepole that run suicide or amok</h1>
if people run suicide or amok, or like i did just tried to commit suicide, then often people think it's because of existence fears, but what it was inteintional murderer by the military, for unknown reason? and since they plan this over a long period they would even play m37 for using dt1 later on as much people as possible. but in the end its about t27 card i bet
<br>
<br>
<br>


   <?php

   $files = glob("*.*");

  for ($i=count($files)-200; $i<count($files); $i++)

{

$image = $files[$i];
$supported_file = array(
    'gif',
    'jpg',
    'jpeg',
    'png'
);

$ext = strtolower(pathinfo($image, PATHINFO_EXTENSION));
if (in_array($ext, $supported_file)) {
    echo '<a href="./'.$image .'"><img width=200 src="'.$image .'" ></a>';
    echo '
';

} else {
    continue;
 }

}

?>

