
<h1>Children that have Psychotic Episodes</h1>
First guess, working through <a href="../../jpg/EN/">all the cards</a> may help to find out what went wrong. Could be that the class maybe judges him for something, or in my case i always stuck to the girls since the boys were much more mean than the girls. If the girls see that he is the outsider of the class they have maybe strong feelings and therefor he would be hated much more by the boys, and they would maybe do something like "Mirror Jury" with him, or better said older people try to force the boys to do a "mirror jury" for blackmaliing them later. I'm 41 Years old, i remember a lot but not all. go through the cards, thay maybe help to find out. you can also print them and combine them. Maybe there he does not talk to older people like i, so maybe an equal aged girl could win his trust. in my particluar case i had problems whan i was a child, but the real problems started with my first and only girlfriend. i fell in love with her, we lived 1 year together and i had the first time sex with someone. since i'm possibly a bit autistic truth is very important for me, but some people played the "jus primae noctis" card over and over again.
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

