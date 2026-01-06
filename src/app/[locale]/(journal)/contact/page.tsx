import PanoramicBanner from "@/components/ui/PanoramicViewer/PanoramicBanner";
import PanoramicLightbox from "@/components/ui/PanoramicViewer/PanoramicLightbox";
import PanoramicViewer from "@/components/ui/PanoramicViewer/PanoramicViewer";

export default function Page() {
  return (
    <>
      {/* Panorama dynamique */}

      {/* <PanoramicViewer
        imageSrc="https://yamn.baarr.fr/sites/default/files/mediatheque/images/2025-12/uv-villa-web.jpg"
        imageAlt="Superbe panorama"
        heightPercentage={100} // optionnel
        headerHeight="0px" // obligatoire si header fixe
      /> */}

      {/* <PanoramicLightbox
        thumbnailSrc="https://yamn.baarr.fr/sites/default/files/mediatheque/images/2025-12/uv-villa-web.jpg"
        fullSrc="https://yamn.baarr.fr/sites/default/files/mediatheque/images/2025-12/uv-villa-web.jpg"
        alt="Atelier d'artiste en panorama"
        thumbnailHeight="60vh"
        /> */}

      {/* <PanoramicBanner
        imageSrc="https://yamn.baarr.fr/sites/default/files/mediatheque/images/2025-12/uv-villa-web.jpg"
        alt="Exploration panoramique"
        height="50vh" // ou "75vh", "50vh", "25vh"
        initialCenterX={5800} // centre sur le pixel 2500 en X
        initialCenterY={300}
        showMiniMap={true}
      /> */}

      <PanoramicLightbox
        thumbnailSrc="https://yamn.baarr.fr/sites/default/files/mediatheque/images/2025-12/uv-villa-web.jpg"
        fullSrc="https://yamn.baarr.fr/sites/default/files/mediatheque/images/2025-12/uv-villa-web.jpg"
        alt="Atelier d'artiste en panorama"
        thumbnailHeight="60vh"
        />

      <div id="lipsum">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in consectetur ligula. Maecenas venenatis egestas turpis, at gravida
          lectus dapibus at. Praesent quam nisl, euismod eu leo pretium, varius ullamcorper mi. Fusce at laoreet arcu. Sed tristique ante tortor,
          lobortis auctor ipsum lacinia congue. Quisque blandit vulputate sollicitudin. Nam vel molestie purus. Quisque a ligula sed urna elementum
          aliquam. Integer molestie eu libero eu imperdiet.
        </p>
        <p>
          Nulla metus enim, porttitor nec ex in, hendrerit tempus risus. Morbi sed sagittis mi, vitae varius erat. Class aptent taciti sociosqu ad
          litora torquent per conubia nostra, per inceptos himenaeos. Phasellus laoreet ligula in velit tempor, eu porttitor velit mattis. Sed ut
          mauris sit amet tortor euismod tincidunt. Duis eget nibh non velit mattis scelerisque mollis et turpis. Donec suscipit in metus eu
          imperdiet. Cras at condimentum felis. Vivamus consectetur cursus fermentum.
        </p>
        <p>
          Phasellus porta lacus libero, ut tincidunt sapien ullamcorper vel. Aliquam volutpat dui non sagittis pharetra. Phasellus porttitor felis
          elit, sed tempor nibh lacinia nec. Duis vel dictum ex. Nunc eu nunc vitae velit pretium tincidunt convallis in purus. In in turpis vel nunc
          pulvinar auctor at et diam. Morbi egestas mauris quam, sit amet suscipit ligula vestibulum in. Vivamus hendrerit tempor neque nec commodo.
          Ut molestie tincidunt est nec aliquam.
        </p>
        <p>
          Mauris non tellus sed lorem vehicula lacinia eget sit amet velit. Duis vitae velit mauris. Etiam lorem tortor, bibendum id congue eu,
          porttitor quis nisl. Donec orci diam, blandit non congue sit amet, suscipit non urna. Donec rhoncus eu nunc eget facilisis. Sed auctor
          lectus et ultrices fringilla. In sit amet nisi a erat feugiat convallis. Donec eget ex eget arcu blandit elementum sed vitae mi. Vivamus ut
          faucibus ipsum. Mauris vitae tellus scelerisque, tincidunt ex eu, sollicitudin sapien. Morbi interdum nunc nec libero condimentum tempor.
          Curabitur odio nisl, tristique vitae purus quis, interdum fringilla nisl.
        </p>
        <p>
          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer interdum, ex id congue pulvinar, odio
          urna convallis ipsum, at fringilla velit erat ut nisi. Sed vitae tellus lacinia, tristique sapien a, tempus est. Suspendisse mollis dui leo,
          quis placerat nisl laoreet eu. Quisque vitae commodo purus. Aliquam eget ligula leo. Etiam aliquam consectetur nunc, nec mollis massa
          accumsan vitae. Phasellus eleifend diam a justo vestibulum, eget tincidunt purus ultrices. Nunc porttitor rhoncus tempus. Pellentesque a
          sodales nulla, et lobortis felis. Cras pretium pellentesque nibh. Aliquam maximus lorem non sem consectetur, tristique vehicula dolor
          sodales. Nulla lobortis, quam ut hendrerit congue, metus dui imperdiet libero, eu faucibus augue arcu sit amet augue. Phasellus ut laoreet
          enim. Donec tempor leo fringilla massa viverra vulputate.
        </p>
      </div>
      {/* Reste de la page */}
    </>
  );
}
