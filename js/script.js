'use strict';

let valeurInit;

const fondChangerCouleur = (cible, couleur) => {
	cible.classList.remove('invalide');
	cible.classList.remove('rien');
	cible.classList.remove('valide');
	cible.classList.add(couleur);
}

const reinitChamps = (liAT, liCG, liLongueurBases, liTM) => {
	liAT.textContent = '-';
	liCG.textContent = '-';
	liLongueurBases.textContent = '-';
	liTM.textContent = '-';
}

const nombreLettre = (chaine,lettreCherchee) => {
	return chaine.split(lettreCherchee).length -1;
}

function testerChamp(){
	// l'élément de la couleur de fond
	const fond = document.querySelector('.ligneForm');
	// mettre la valeur en majuscules
	this.value = this.value.toUpperCase();
	// récupérer cette valeur
	const valeurTapee = this.value;
	// tester la valeur entrée
	let valeurSansEspaces = valeurTapee.replace(/\s/g, ""); // virer les espaces de la chaine
	let regex = new RegExp(/^[ATCG]{1,25}$/g); // une règle à respecter
	let hypothese = regex.test(valeurSansEspaces); // est-elle respectée ?
	// si la valeur entrée est respectueuse
	if ( hypothese ) {
		// les éléments dont on a besoin
		const liAT = document.querySelector('#liAT');
		const liCG = document.querySelector('#liCG');
		const liLongueurBases = document.querySelector('#liLongueurBases');
		const liTM = document.querySelector('#liTM');
		// tester la longueur admise
		if(valeurSansEspaces.length >= 17 && valeurSansEspaces.length <= 25){
			// on est bon
			// maintenant, la chaine doit avoir au moins 1 lettre de chaque type (par ex. que des A n'est pas autorisé)
			//const regex2 = new RegExp(/^(?=.+[A])(?=.+[T])(?=.+[C])(?=.+[G])[ATCG]{17,25}$/);
			//if(regex2.test(valeurTapee)){
				fondChangerCouleur(fond, 'valide');
				/*let nbreA = 0;
				if(valeurTapee.match(/A/g)){
					nbreA = valeurTapee.match(/A/g).length;
				}*/
				let nbreA = nombreLettre(valeurSansEspaces,'A');
				let nbreT = nombreLettre(valeurSansEspaces,'T');
				let nbreC = nombreLettre(valeurSansEspaces,'C');
				let nbreG = nombreLettre(valeurSansEspaces,'G');
				// console.log(nbreA, nbreT, nbreC, nbreG);
				const nbreAT = nbreA + nbreT;
				const nbreCG = nbreC + nbreG;
				const longueur = nbreAT + nbreCG;
				const pourcentAT = Math.round( (nbreAT / longueur * 100) );
				const pourcentCG = Math.round( (nbreCG / longueur * 100) );
				const valeurTM = (2 * nbreAT) + (4 * nbreCG);
				liAT.textContent = `${nbreAT} (${pourcentAT}%)`;
				liCG.textContent = `${nbreCG} (${pourcentCG}%)`;
				liTM.textContent = valeurTM + '°C';
				liLongueurBases.textContent = longueur;
			//}else{
			//	fondChangerCouleur(fond, 'rien');
			//	reinitChamps(liAT, liCG, liLongueurBases, liTM);
			//}
		}else{
			fondChangerCouleur(fond, 'rien');
			reinitChamps(liAT, liCG, liLongueurBases, liTM);
		}
		// enregistrer la valeur tapée (car correcte)
		valeurInit = valeurTapee;
	// si pas de valeur, revenir par défaut
	}else if(valeurTapee.length === 0){
		fondChangerCouleur(fond, 'rien');
		valeurInit = this.value;
	// sinon, erreur
  }else{
		this.value = valeurInit;
	}
}

document.addEventListener('DOMContentLoaded', () => 
{
	const champ = document.querySelector('input');
	champ.addEventListener('input', testerChamp);
	champ.value = null;
	valeurInit = champ.value;
});
