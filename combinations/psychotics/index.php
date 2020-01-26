
<h1>Anti-Psychotics and "Anti-Psychotics"</h1>
Maybe see all cards <a href="../../jpg/EN/">all the cards</a>
maybe it are all electronic impulses interpreted by your brain, and of course chemicals induce the psyche and the mind, but looprecorder influence the mind too, and communication chanels can be different too.
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

