import Route from "./Route.js";
import { allRoutes, websitename } from "./allRoutes.js";

// Creation d'une route pour la page 404 (page non trouvée)
const route404 = new Route("404", "Page introuvable", "/pages/404.html");

// Function pour recuperer la route correspondant a une URL donnée
const getRouteByUrl = (url) => {
  let currentRoute = null;
  // Parcours de toutes les routes pour trouver la correspondante
  for (const element of allRoutes) {
    if (element.url === url) {
      currentRoute = element;
    }
  }
  //allRoutes.forEach((element) => {
    //if (element.url === url) {
      //currentRoute = element;
    //}
  //});
  // Si aucune correspondance n'a été trouvée, on retourne la route 404
  if (currentRoute != null) {
    return currentRoute;
  } else {
    return route404;
  }
};

// Fonction pour charger le contenu de la page
const LoadContentPage = async () => {
  const path = window.location.pathname;
  // Recuperation de l'URL actuelle
  const actualRoute = getRouteByUrl(path);
  // Recuperation du contenu HTML de la route
  const html = await fetch(actualRoute.pathHtml).then((data) => data.text());
  // Ajout du contenu HTML a l'element avec l'id "main-page"
  document.getElementById("main-page").innerHTML = html;

  // Ajout du contenu JS
  if (actualRoute.pathJS !== "") {
    //Creation d'une balise script
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute("type", "text/javascript");
    scriptTag.setAttribute("src", actualRoute.pathJS);

    // Ajout de la balise script au corps du document
    document.querySelector("body").appendChild(scriptTag);
  }
  // Changement du titre de la page
  document.title = `${actualRoute.title} - ${websitename}`;
};

// Fonction pour gerer les evenements de routage (clics sur les liens)
const routeEvent = (event) => {
  event = event || window.event;
  event.preventDefault();
  // Mose a jour de l'URL dans l'historique du navigateur
  window.history.pushState({}, "", event.target.href);
  // Chargement du contenu de la nouvelle page
  LoadContentPage();
};

// Gestion de l'evenement de retour en arriere dans l'historique du navigateur
window.onpopstate = LoadContentPage;
// Assignation de la fonction routeEvent a la propriete route de la fenetre
window.route = routeEvent;
// Chargement du contenu de la page au chatgement initial
LoadContentPage();