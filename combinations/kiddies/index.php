
<h1>Kiddies Cards</h1>
Mummies maybe should look at all cards <a href="../../jpg/EN/">all the cards</a>
the idea would be, that kids have enough prerequisites for the shitty world we live in, in the face of attack one can simply add the complete deck so that the kid that is beeing attacked can defend him-/herself against things like dt1 or a16... if <font color="green">kid is not beeing attacked</font> not the complete deck is required. <font color="red">in case you attack kids</font> or make parents attack them, or if you use dirthy things like <font color="red">sk1</font> card, then <font color="red"><b>we will distribute the complete deck</b></font>.
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

