import { fromEvent, map, tap } from "rxjs";

// create a div with text
const textDiv = document.createElement("div");
textDiv.innerHTML = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan velit non molestie feugiat. Quisque at nisi quis metus ultricies sollicitudin. Suspendisse ut lorem velit. Nullam elit tortor, lacinia nec ultricies quis, viverra vel justo. Integer volutpat hendrerit nibh ut rutrum. Duis accumsan arcu pellentesque maximus luctus. Nullam bibendum rhoncus erat, at tempor velit. Duis in ex felis. Curabitur ac posuere magna. Nam egestas odio in enim facilisis, id dapibus sapien porttitor.
<br /><br />
Curabitur auctor tempor orci vel accumsan. Sed rhoncus elit vel molestie rutrum. Nulla purus diam, rhoncus nec lacus vel, mollis tempus ipsum. Ut sed ligula laoreet nunc tempus finibus vel vel elit. Aliquam leo orci, iaculis quis odio consequat, dapibus rhoncus massa. Phasellus varius rhoncus ligula eu auctor. Maecenas vitae leo mollis, viverra leo vel, mattis mauris. Nunc enim erat, feugiat et enim a, ultrices mollis justo. Nam auctor facilisis tellus, tincidunt mattis sem aliquam sed. Nulla non cursus mi, nec mollis risus. Phasellus tellus nunc, dictum vel lacus vel, varius laoreet lacus. Quisque a semper leo. Integer ultricies mi a nunc rhoncus rhoncus. Cras vehicula tristique orci, cursus auctor lacus hendrerit ac. Ut imperdiet diam sit amet massa aliquet fringilla. Phasellus euismod auctor lacus quis sollicitudin.
<br /><br />
Proin vulputate, metus vitae efficitur vestibulum, quam eros pulvinar lacus, ut rhoncus magna lectus sit amet nibh. Vestibulum gravida, enim ac faucibus molestie, erat quam rhoncus velit, nec interdum elit augue eget elit. Donec ac ex nunc. In mi nisl, pulvinar vitae leo maximus, vestibulum vestibulum odio. Nulla porttitor quam et efficitur mollis. Sed quis rhoncus justo. Nam ut augue libero. Vestibulum diam arcu, volutpat id ligula ac, hendrerit finibus odio. Morbi vel aliquet libero, at sollicitudin turpis. Donec dui purus, lacinia sed luctus nec, vestibulum sit amet orci.
<br /><br />
Nam venenatis volutpat mi eu rutrum. Ut eu augue sit amet quam scelerisque mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut nec nisl a ligula convallis varius. Sed laoreet lacus quis ipsum vehicula pharetra. Fusce lectus augue, congue sed sem eu, finibus pretium nisl. Nam eget finibus quam, eget eleifend ante. Pellentesque aliquam nisi nulla, et ultrices sem finibus eget. Suspendisse rutrum sed dolor nec sollicitudin. Ut auctor vestibulum leo commodo posuere.
<br /><br />
Sed non lobortis ex. Duis magna massa, sollicitudin sed leo a, vehicula malesuada mi. Quisque nec ultricies est. Vivamus non enim dolor. Fusce vitae elit non eros tristique efficitur sed sit amet sem. Praesent dictum porttitor tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam fringilla dapibus massa, nec semper augue varius ac. Praesent faucibus nisl ligula, non vestibulum metus venenatis in. Vivamus consequat turpis vitae luctus gravida. Nulla at enim dignissim ante porttitor pretium.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan velit non molestie feugiat. Quisque at nisi quis metus ultricies sollicitudin. Suspendisse ut lorem velit. Nullam elit tortor, lacinia nec ultricies quis, viverra vel justo. Integer volutpat hendrerit nibh ut rutrum. Duis accumsan arcu pellentesque maximus luctus. Nullam bibendum rhoncus erat, at tempor velit. Duis in ex felis. Curabitur ac posuere magna. Nam egestas odio in enim facilisis, id dapibus sapien porttitor.
<br /><br />
Curabitur auctor tempor orci vel accumsan. Sed rhoncus elit vel molestie rutrum. Nulla purus diam, rhoncus nec lacus vel, mollis tempus ipsum. Ut sed ligula laoreet nunc tempus finibus vel vel elit. Aliquam leo orci, iaculis quis odio consequat, dapibus rhoncus massa. Phasellus varius rhoncus ligula eu auctor. Maecenas vitae leo mollis, viverra leo vel, mattis mauris. Nunc enim erat, feugiat et enim a, ultrices mollis justo. Nam auctor facilisis tellus, tincidunt mattis sem aliquam sed. Nulla non cursus mi, nec mollis risus. Phasellus tellus nunc, dictum vel lacus vel, varius laoreet lacus. Quisque a semper leo. Integer ultricies mi a nunc rhoncus rhoncus. Cras vehicula tristique orci, cursus auctor lacus hendrerit ac. Ut imperdiet diam sit amet massa aliquet fringilla. Phasellus euismod auctor lacus quis sollicitudin.
<br /><br />
Proin vulputate, metus vitae efficitur vestibulum, quam eros pulvinar lacus, ut rhoncus magna lectus sit amet nibh. Vestibulum gravida, enim ac faucibus molestie, erat quam rhoncus velit, nec interdum elit augue eget elit. Donec ac ex nunc. In mi nisl, pulvinar vitae leo maximus, vestibulum vestibulum odio. Nulla porttitor quam et efficitur mollis. Sed quis rhoncus justo. Nam ut augue libero. Vestibulum diam arcu, volutpat id ligula ac, hendrerit finibus odio. Morbi vel aliquet libero, at sollicitudin turpis. Donec dui purus, lacinia sed luctus nec, vestibulum sit amet orci.
<br /><br />
Nam venenatis volutpat mi eu rutrum. Ut eu augue sit amet quam scelerisque mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut nec nisl a ligula convallis varius. Sed laoreet lacus quis ipsum vehicula pharetra. Fusce lectus augue, congue sed sem eu, finibus pretium nisl. Nam eget finibus quam, eget eleifend ante. Pellentesque aliquam nisi nulla, et ultrices sem finibus eget. Suspendisse rutrum sed dolor nec sollicitudin. Ut auctor vestibulum leo commodo posuere.
<br /><br />
Sed non lobortis ex. Duis magna massa, sollicitudin sed leo a, vehicula malesuada mi. Quisque nec ultricies est. Vivamus non enim dolor. Fusce vitae elit non eros tristique efficitur sed sit amet sem. Praesent dictum porttitor tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam fringilla dapibus massa, nec semper augue varius ac. Praesent faucibus nisl ligula, non vestibulum metus venenatis in. Vivamus consequat turpis vitae luctus gravida. Nulla at enim dignissim ante porttitor pretium.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan velit non molestie feugiat. Quisque at nisi quis metus ultricies sollicitudin. Suspendisse ut lorem velit. Nullam elit tortor, lacinia nec ultricies quis, viverra vel justo. Integer volutpat hendrerit nibh ut rutrum. Duis accumsan arcu pellentesque maximus luctus. Nullam bibendum rhoncus erat, at tempor velit. Duis in ex felis. Curabitur ac posuere magna. Nam egestas odio in enim facilisis, id dapibus sapien porttitor.
<br /><br />
Curabitur auctor tempor orci vel accumsan. Sed rhoncus elit vel molestie rutrum. Nulla purus diam, rhoncus nec lacus vel, mollis tempus ipsum. Ut sed ligula laoreet nunc tempus finibus vel vel elit. Aliquam leo orci, iaculis quis odio consequat, dapibus rhoncus massa. Phasellus varius rhoncus ligula eu auctor. Maecenas vitae leo mollis, viverra leo vel, mattis mauris. Nunc enim erat, feugiat et enim a, ultrices mollis justo. Nam auctor facilisis tellus, tincidunt mattis sem aliquam sed. Nulla non cursus mi, nec mollis risus. Phasellus tellus nunc, dictum vel lacus vel, varius laoreet lacus. Quisque a semper leo. Integer ultricies mi a nunc rhoncus rhoncus. Cras vehicula tristique orci, cursus auctor lacus hendrerit ac. Ut imperdiet diam sit amet massa aliquet fringilla. Phasellus euismod auctor lacus quis sollicitudin.
<br /><br />
Proin vulputate, metus vitae efficitur vestibulum, quam eros pulvinar lacus, ut rhoncus magna lectus sit amet nibh. Vestibulum gravida, enim ac faucibus molestie, erat quam rhoncus velit, nec interdum elit augue eget elit. Donec ac ex nunc. In mi nisl, pulvinar vitae leo maximus, vestibulum vestibulum odio. Nulla porttitor quam et efficitur mollis. Sed quis rhoncus justo. Nam ut augue libero. Vestibulum diam arcu, volutpat id ligula ac, hendrerit finibus odio. Morbi vel aliquet libero, at sollicitudin turpis. Donec dui purus, lacinia sed luctus nec, vestibulum sit amet orci.
<br /><br />
Nam venenatis volutpat mi eu rutrum. Ut eu augue sit amet quam scelerisque mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut nec nisl a ligula convallis varius. Sed laoreet lacus quis ipsum vehicula pharetra. Fusce lectus augue, congue sed sem eu, finibus pretium nisl. Nam eget finibus quam, eget eleifend ante. Pellentesque aliquam nisi nulla, et ultrices sem finibus eget. Suspendisse rutrum sed dolor nec sollicitudin. Ut auctor vestibulum leo commodo posuere.
<br /><br />
Sed non lobortis ex. Duis magna massa, sollicitudin sed leo a, vehicula malesuada mi. Quisque nec ultricies est. Vivamus non enim dolor. Fusce vitae elit non eros tristique efficitur sed sit amet sem. Praesent dictum porttitor tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam fringilla dapibus massa, nec semper augue varius ac. Praesent faucibus nisl ligula, non vestibulum metus venenatis in. Vivamus consequat turpis vitae luctus gravida. Nulla at enim dignissim ante porttitor pretium.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan velit non molestie feugiat. Quisque at nisi quis metus ultricies sollicitudin. Suspendisse ut lorem velit. Nullam elit tortor, lacinia nec ultricies quis, viverra vel justo. Integer volutpat hendrerit nibh ut rutrum. Duis accumsan arcu pellentesque maximus luctus. Nullam bibendum rhoncus erat, at tempor velit. Duis in ex felis. Curabitur ac posuere magna. Nam egestas odio in enim facilisis, id dapibus sapien porttitor.
<br /><br />
Curabitur auctor tempor orci vel accumsan. Sed rhoncus elit vel molestie rutrum. Nulla purus diam, rhoncus nec lacus vel, mollis tempus ipsum. Ut sed ligula laoreet nunc tempus finibus vel vel elit. Aliquam leo orci, iaculis quis odio consequat, dapibus rhoncus massa. Phasellus varius rhoncus ligula eu auctor. Maecenas vitae leo mollis, viverra leo vel, mattis mauris. Nunc enim erat, feugiat et enim a, ultrices mollis justo. Nam auctor facilisis tellus, tincidunt mattis sem aliquam sed. Nulla non cursus mi, nec mollis risus. Phasellus tellus nunc, dictum vel lacus vel, varius laoreet lacus. Quisque a semper leo. Integer ultricies mi a nunc rhoncus rhoncus. Cras vehicula tristique orci, cursus auctor lacus hendrerit ac. Ut imperdiet diam sit amet massa aliquet fringilla. Phasellus euismod auctor lacus quis sollicitudin.
<br /><br />
Proin vulputate, metus vitae efficitur vestibulum, quam eros pulvinar lacus, ut rhoncus magna lectus sit amet nibh. Vestibulum gravida, enim ac faucibus molestie, erat quam rhoncus velit, nec interdum elit augue eget elit. Donec ac ex nunc. In mi nisl, pulvinar vitae leo maximus, vestibulum vestibulum odio. Nulla porttitor quam et efficitur mollis. Sed quis rhoncus justo. Nam ut augue libero. Vestibulum diam arcu, volutpat id ligula ac, hendrerit finibus odio. Morbi vel aliquet libero, at sollicitudin turpis. Donec dui purus, lacinia sed luctus nec, vestibulum sit amet orci.
<br /><br />
Nam venenatis volutpat mi eu rutrum. Ut eu augue sit amet quam scelerisque mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut nec nisl a ligula convallis varius. Sed laoreet lacus quis ipsum vehicula pharetra. Fusce lectus augue, congue sed sem eu, finibus pretium nisl. Nam eget finibus quam, eget eleifend ante. Pellentesque aliquam nisi nulla, et ultrices sem finibus eget. Suspendisse rutrum sed dolor nec sollicitudin. Ut auctor vestibulum leo commodo posuere.
<br /><br />
Sed non lobortis ex. Duis magna massa, sollicitudin sed leo a, vehicula malesuada mi. Quisque nec ultricies est. Vivamus non enim dolor. Fusce vitae elit non eros tristique efficitur sed sit amet sem. Praesent dictum porttitor tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam fringilla dapibus massa, nec semper augue varius ac. Praesent faucibus nisl ligula, non vestibulum metus venenatis in. Vivamus consequat turpis vitae luctus gravida. Nulla at enim dignissim ante porttitor pretium.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan velit non molestie feugiat. Quisque at nisi quis metus ultricies sollicitudin. Suspendisse ut lorem velit. Nullam elit tortor, lacinia nec ultricies quis, viverra vel justo. Integer volutpat hendrerit nibh ut rutrum. Duis accumsan arcu pellentesque maximus luctus. Nullam bibendum rhoncus erat, at tempor velit. Duis in ex felis. Curabitur ac posuere magna. Nam egestas odio in enim facilisis, id dapibus sapien porttitor.
<br /><br />
Curabitur auctor tempor orci vel accumsan. Sed rhoncus elit vel molestie rutrum. Nulla purus diam, rhoncus nec lacus vel, mollis tempus ipsum. Ut sed ligula laoreet nunc tempus finibus vel vel elit. Aliquam leo orci, iaculis quis odio consequat, dapibus rhoncus massa. Phasellus varius rhoncus ligula eu auctor. Maecenas vitae leo mollis, viverra leo vel, mattis mauris. Nunc enim erat, feugiat et enim a, ultrices mollis justo. Nam auctor facilisis tellus, tincidunt mattis sem aliquam sed. Nulla non cursus mi, nec mollis risus. Phasellus tellus nunc, dictum vel lacus vel, varius laoreet lacus. Quisque a semper leo. Integer ultricies mi a nunc rhoncus rhoncus. Cras vehicula tristique orci, cursus auctor lacus hendrerit ac. Ut imperdiet diam sit amet massa aliquet fringilla. Phasellus euismod auctor lacus quis sollicitudin.
<br /><br />
Proin vulputate, metus vitae efficitur vestibulum, quam eros pulvinar lacus, ut rhoncus magna lectus sit amet nibh. Vestibulum gravida, enim ac faucibus molestie, erat quam rhoncus velit, nec interdum elit augue eget elit. Donec ac ex nunc. In mi nisl, pulvinar vitae leo maximus, vestibulum vestibulum odio. Nulla porttitor quam et efficitur mollis. Sed quis rhoncus justo. Nam ut augue libero. Vestibulum diam arcu, volutpat id ligula ac, hendrerit finibus odio. Morbi vel aliquet libero, at sollicitudin turpis. Donec dui purus, lacinia sed luctus nec, vestibulum sit amet orci.
<br /><br />
Nam venenatis volutpat mi eu rutrum. Ut eu augue sit amet quam scelerisque mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut nec nisl a ligula convallis varius. Sed laoreet lacus quis ipsum vehicula pharetra. Fusce lectus augue, congue sed sem eu, finibus pretium nisl. Nam eget finibus quam, eget eleifend ante. Pellentesque aliquam nisi nulla, et ultrices sem finibus eget. Suspendisse rutrum sed dolor nec sollicitudin. Ut auctor vestibulum leo commodo posuere.
<br /><br />
Sed non lobortis ex. Duis magna massa, sollicitudin sed leo a, vehicula malesuada mi. Quisque nec ultricies est. Vivamus non enim dolor. Fusce vitae elit non eros tristique efficitur sed sit amet sem. Praesent dictum porttitor tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam fringilla dapibus massa, nec semper augue varius ac. Praesent faucibus nisl ligula, non vestibulum metus venenatis in. Vivamus consequat turpis vitae luctus gravida. Nulla at enim dignissim ante porttitor pretium.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas accumsan velit non molestie feugiat. Quisque at nisi quis metus ultricies sollicitudin. Suspendisse ut lorem velit. Nullam elit tortor, lacinia nec ultricies quis, viverra vel justo. Integer volutpat hendrerit nibh ut rutrum. Duis accumsan arcu pellentesque maximus luctus. Nullam bibendum rhoncus erat, at tempor velit. Duis in ex felis. Curabitur ac posuere magna. Nam egestas odio in enim facilisis, id dapibus sapien porttitor.
<br /><br />
Curabitur auctor tempor orci vel accumsan. Sed rhoncus elit vel molestie rutrum. Nulla purus diam, rhoncus nec lacus vel, mollis tempus ipsum. Ut sed ligula laoreet nunc tempus finibus vel vel elit. Aliquam leo orci, iaculis quis odio consequat, dapibus rhoncus massa. Phasellus varius rhoncus ligula eu auctor. Maecenas vitae leo mollis, viverra leo vel, mattis mauris. Nunc enim erat, feugiat et enim a, ultrices mollis justo. Nam auctor facilisis tellus, tincidunt mattis sem aliquam sed. Nulla non cursus mi, nec mollis risus. Phasellus tellus nunc, dictum vel lacus vel, varius laoreet lacus. Quisque a semper leo. Integer ultricies mi a nunc rhoncus rhoncus. Cras vehicula tristique orci, cursus auctor lacus hendrerit ac. Ut imperdiet diam sit amet massa aliquet fringilla. Phasellus euismod auctor lacus quis sollicitudin.
<br /><br />
Proin vulputate, metus vitae efficitur vestibulum, quam eros pulvinar lacus, ut rhoncus magna lectus sit amet nibh. Vestibulum gravida, enim ac faucibus molestie, erat quam rhoncus velit, nec interdum elit augue eget elit. Donec ac ex nunc. In mi nisl, pulvinar vitae leo maximus, vestibulum vestibulum odio. Nulla porttitor quam et efficitur mollis. Sed quis rhoncus justo. Nam ut augue libero. Vestibulum diam arcu, volutpat id ligula ac, hendrerit finibus odio. Morbi vel aliquet libero, at sollicitudin turpis. Donec dui purus, lacinia sed luctus nec, vestibulum sit amet orci.
<br /><br />
Nam venenatis volutpat mi eu rutrum. Ut eu augue sit amet quam scelerisque mollis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Ut nec nisl a ligula convallis varius. Sed laoreet lacus quis ipsum vehicula pharetra. Fusce lectus augue, congue sed sem eu, finibus pretium nisl. Nam eget finibus quam, eget eleifend ante. Pellentesque aliquam nisi nulla, et ultrices sem finibus eget. Suspendisse rutrum sed dolor nec sollicitudin. Ut auctor vestibulum leo commodo posuere.
<br /><br />
Sed non lobortis ex. Duis magna massa, sollicitudin sed leo a, vehicula malesuada mi. Quisque nec ultricies est. Vivamus non enim dolor. Fusce vitae elit non eros tristique efficitur sed sit amet sem. Praesent dictum porttitor tincidunt. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam fringilla dapibus massa, nec semper augue varius ac. Praesent faucibus nisl ligula, non vestibulum metus venenatis in. Vivamus consequat turpis vitae luctus gravida. Nulla at enim dignissim ante porttitor pretium.
`;
const body = document.querySelector("body");
body.append(textDiv);

// create a progress bar
const progressBar = document.createElement("div");
progressBar.setAttribute("class", "progress-bar");
body.append(progressBar);

// Calc the porcentage
const calcProgressbarPorcentage = (event: any) => {
  const { scrollTop, clientHeight, scrollHeight } =
    event?.target?.documentElement;

  return (scrollTop / (scrollHeight - clientHeight)) * 100;
};

// Stream
const scroll$ = fromEvent(document, "scroll");

const progress$ = scroll$.pipe(
  map<Event, number>(calcProgressbarPorcentage),
  tap(console.log)
);

progress$.subscribe((porcentage) => {
  // add dynamic porcentage to the width of the progress bar
  progressBar.style.width = `${porcentage}%`;
});
