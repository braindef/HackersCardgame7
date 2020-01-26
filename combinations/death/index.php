
<h1>its not the coffe in my kitchen, its the dead *DONT USE THIS WORD* in my garage</h1>
Unfortunately a socio-psychology pattern to blackmail a complete group, see dt1 card, or even all <a href="../../jpg/EN/">cards</a>
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

