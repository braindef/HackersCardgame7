
<h1>Some drugs are maybe just Software on the mainframe</h1>
But as long as you dont have a PhD in Medicine AND Pharmacology AND Computer Science you can not be sure about this hypothesis. And of course some chemicals have effect on the endocrine system but this does not include nor exclude that additional some thing like t1 card but 70 Years newer transmits additional data to your brain
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

