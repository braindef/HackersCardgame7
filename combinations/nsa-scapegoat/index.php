
<h1>Hacker, Gamer and Science Scapegoats (Sündenböcke)</h1>
Maybe see all cards <a href="../../jpg/EN/">all the cards</a>
but someone seems inteintionally to produce scapegoates for the things systems like NSA / CIA does... they changed the "observer pattern" so we created it again and now its better than before.
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

