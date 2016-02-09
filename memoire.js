//----------------------------------------------------------------------------------------------------------------------------------------------//
//--------------------------------------------Fonction javascript du jeu memoire----------------------------------------------------------------//
//-----------------------------------------------------memoire.js-------------------------------------------------------------------------------//
//---------------------------------------------------Beatriz Kanzki-----------------------------------------------------------------------------//
//----------------------------------------------------------------------------------------------------------------------------------------------//
var t;                          //taille selectionnee
var th;                         //theme selectionnee
var nbj;                        //nombre de joueur selectionnee
var turn;                       //qui debute la partie
var melange;                    //carte melange
var unique1;                    //carte unique
var unique2;                    //carte unique 2
var maudite1;                   //carte maudite 1
var maudite2;                   //carte maudite 2
var joker;                      //carte joker
var image=[];                   //tableau non initialise des images a clicker
var imgGagne=[];                //tableau des images gagnees
var imageDos=[];                //tableau image du dos de la carte
var carte1='';                  //1ere carte clicker
var carte2='';                  //2e carte clicker
var coordX1;                    //coordonnee de la carte;
var coordY1;                    //coordonnee de la carte
var coordX2;                    //coordonnee de la carte;
var coordY2;                    //coordonnee de la carte
var cpt=1;                      //compteur qui compte si la carte 2e carte a ete selectionnee
var gagne=false;                //variable qui donne la main au joueur tour a tour
var s1=0;                       //score joueur 1
var s2=0;                       //score joueur 2
var finDuJeu;
var joueur1;                    
var joueur2;
var joueurCourant;              //joueur qui a la main
var gestionPoint;               //variable initial de la gestion de point
var gris='<img src="gris.jpg" width="70" height="70" alt="gris" />';                    //image grise
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //cree tableau a deux dimensions avec elements a undefined
//----------------------------------------------------------------------------------------------------------------------------------------------//
var creerTab=function(tab,l){
    tab=Array(l)
    for(var i=0;i<t;i++){
        tab[i]=Array(l);
    }
    return tab;
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //lance le jeu et trace la grille selon parametre selectionnee
//----------------------------------------------------------------------------------------------------------------------------------------------//
var grille=function(){
  var jeu=document.getElementById("jeu");
  var j='<table class="jeu" width="100" border="1" cellspacing="1" cellpadding="0">';
    t=cherche("taille");                                //aller chercher les valeur cocher
    th=cherche("theme");
    nbj=cherche("nbreJoueur");
    turn=cherche("Joueur");
    verif("taille","theme","nbreJoueur","Joueur");       //si aucune valeur mettre des valeurs par default
    joueurCourant=turn;                                  //qui est le joueur courant
    placeJoueur();                                       //place les joeurs
    image=creerTab(image,t);                             //initialise tableau d'image
    imageDos=creerTab(imageDos,t);                       //initialise tableau image verso
    image=remplirTabImg(th);                             //On cree un tableau a une dimension des images selectionnee
    image=shuffle(image);                                //melange image
    redessineGrille();                                   //On dessine la grille
    desactive();                                         //Desactive les checkbox                                          //Affiche la grille de carte
}
//-----------------------------------------------------------------------------------------------------------------------------------------------//
                                    //Fonction qui desactive parametre apres avoir clicker sur start game
//-----------------------------------------------------------------------------------------------------------------------------------------------//
var desactive=function(){
    document.getElementById("8X8").disabled = true;
    document.getElementById("10X10").disabled = true;
    document.getElementById("Joueur1").disabled = true;
    document.getElementById("Joueur2").disabled = true;
    document.getElementById("Jo1").disabled = true;
    document.getElementById("Jo2").disabled = true;
    document.getElementById("Jo3").disabled = true;
    document.getElementById("fruit").disabled = true;
    document.getElementById("voiture").disabled = true;
    document.getElementById("start").disabled=true;
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //Recherche elements cocher dans la grille menu
//----------------------------------------------------------------------------------------------------------------------------------------------//
var cherche=function(s){            
var r=document.getElementsByName(s);
        var n=0;
        for(var i=0; i<r.length; i++) {
         if(r[i].checked ){
            n=r[i].value;
         }   
        }
        return n;
}
//-----------------------------------------------------------------------------------------------------------------------------------------------//
                                //fonctions swap et shuffle pour melanger les cartes
//-----------------------------------------------------------------------------------------------------------------------------------------------//
var shuffle=function(tab){
   var i0,j0,i1,j1,k ;
   var temp1 ;
   var temp2 ;
   var l=tab.length;//largeur de la matrice
   var m=(l*l)-1;//taille de la matrice-1
   while(m >= 0){
        i0=m%l;
        j0=Math.floor(m/l);
	k = Math.floor(Math.random() * m);
        i1=k%l;
        j1=Math.floor(k/l);
	temp1 = tab[i0][j0];
	temp2 = tab[i1][j1];
	tab[i0][j0] = temp2;
	tab[i1][j1] = temp1;
        //alert(tab[i0][j0]);
        //alert(tab[i1][j1]);
	m = m - 1;
    }
    return tab;
 };
//-----------------------------------------------------------------------------------------------------------------------------------------------//
                                //verifie cases selectionnee au cas ou le joueur n'a rien selectionne met des valeurs par defaut
//-----------------------------------------------------------------------------------------------------------------------------------------------//
var verif=function(v1,v2,v3,v4){
    var test=[v1,v2,v3,v4];
    for(var i=0;i<test.length;i++){
	switch (test[i]) {
            case "taille":
                if (t==0) {
                    t=8;
                }
                if (t==8) {                                                 //Si grille de taille 8 il faut adapter l'interface
                  document.getElementById('menu').style.height="587px";
                  document.getElementById('menu').style.width="350px"
                  document.getElementById('content').style.height="587px";
                  document.getElementById('score').style.height="587px";
                  document.getElementById('content').style.width="587px";
                  document.getElementById('score').style.width="318px";
                }

                break;
            case "theme":
                if (th==0) {
                    th="v";
                }
                break;
            case"nbreJoueur":
                if (nbj==0||nbj==1) {
                    nbj=1;
                }
                break;
            case"Joueur":
                if ((turn==0||turn=="Joueur 2")&&nbj==1) {
                    joueur2="Systeme"
                    turn=joueur2;
                }
                if ((turn==0||turn=="Joueur 2")&&nbj==2) {
                    joueur2="Joueur 2"
                    turn=joueur2;
                }
                break;
        }
    }
};
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //permet de visionner et comparer les carte
//----------------------------------------------------------------------------------------------------------------------------------------------//
var comparaison=function(c1,c2){
        var compte=0;
        finDuJeu=fin();
        if (carte1==carte2) {                                   //Si image egale
            image[coordX1][coordY1]=gris;                       //case grise
            image[coordX2][coordY2]=gris;
            imgGagne.push(c1);                                  //on rentre image dans tableau d'image gagne
            gagne=true;                                         //on gagne
            gestionPoint="+";                                   //on gere les points
            score(joueurCourant,gestionPoint)                   //on met les scores a jours
            if (finDuJeu) {                                     //Si fin
                gestGagnant();                                  //declare le gagnant
            } 
        }
        else{
            var carteSpec1=gererCarteSpec(carte1,coordX1,coordY1);
            var carteSpec2=gererCarteSpec(carte2,coordX2,coordY2);
            if ((carte1==maudite1||carte1==maudite2)&&(carte2==maudite1||carte2==maudite2)&&compte==0) {
		gestionPoint="+";
		score(joueurCourant,gestionPoint);
		gestJoueur()
                compte++;
	    }
	    if (((carte1==maudite1||carte1==maudite2 )||( carte2==maudite1||carte2==maudite2))&&(carte1==joker||carte2==joker)) {
		gestionPoint="+";
		score(joueurCourant,gestionPoint);
		gagne=true;
		gestJoueur()
                compte++;
	    }
	    if (carteSpec1&&carteSpec2&&compte==0) {       //Si les deux cartes sont speciales
                gestJoueur()
                compte++;
            }
            if (carteSpec1&&compte==0) {
                gestJoueur();
                compte++;
            }
            if (carteSpec2&&compte==0) {       //Si carte une seule carte speciale
                gestJoueur()
                compte++;
            }
            if(carte1!=carte2&&(!carteSpec1||!carteSpec2)&&compte==0){                                               //Sinon aucun cartes n'est pareil et pas de carte speciale
                gagne=false;       
                gestJoueur();
                compte++;
            }
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //fonction affichant et fermant fenetre d'instruction
//----------------------------------------------------------------------------------------------------------------------------------------------//
var myWindow;
function openWin() {
    myWindow = window.open("", "Instructions", "width=500, height=650");
    myWindow.document.write("<p ALIGN=\"center\"><strong>Instructions du jeu</strong></p><br><p>Le jeu consiste a trouver les images dans une grille en les choissisant 2 par 2 en s'assurant qu'elles sont pareil.</p><p>-  Si vous jouez contre le systeme un bouton apparaitra dans le coin droit sous les grilles de score et vous devrez cliquer pour generer des cartes aleatoires, car il ne vous sera pas autorise de cliquer sur la grille lorsque le systeme joue.</p><p>-  La case des scores deviendra bleue indiquant le joueur courant, sauf quand vous trouvez deux cartes pareils, dans ce cas le joueur courant rejouera.</p><p>-  Si vous selectionnee une image avec beaucoup de fruits et de voitures. Toutes les images de la grille seront melangees.</p><p>-  Si vous selectionnez le <em>JOKER</em> vous pourrez rejouer.</p><p>-  Si vous avez l'une des cartes maudite vous perdrez un point, la derniere image gagnee sera remise dans la grille et toutes les cartes seront melanges, sauf si votre score etait a <em><strong>0</strong></em> dans ce cas vous ne perdrez pas de point mais les images seront melangees seulement.</p><p>-  Si vous prenez une des cartes uniques vous n'aurez pas le droit de rejouer mais cela peut donner un avantage a votre adversaire car vous aurez decouvert une carte de la grille.</p><br><br><p ALIGN=\"center\"><strong>BONNE CHANCE! </strong></p>");  
    setTimeout(function(){myWindow.close()},3000000)
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //fonction permettant de mettre l'image du dos de la carte selon le joueurCourant
//----------------------------------------------------------------------------------------------------------------------------------------------//
var imageCourante=function(i,j){
    finDuJeu=fin();
    if (joueurCourant=="Systeme"||finDuJeu) {
        return '<img src="IMG_0003.jpg" width="70" height="70" alt="Waterfall" />';     //image sans click
    }
    if(joueurCourant!="Systeme"){
        return'<img src="IMG_0003.jpg" width="70" height="70" alt="Waterfall" onclick="montre('+i+','+j+')" />'; //image avec click
    }
};
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //permet de redessiner grille apres chaque carte choisie
//----------------------------------------------------------------------------------------------------------------------------------------------//
var redessineGrille=function(){                                                       
            var jeuOn=document.getElementById("jeu");                                               //Le jeu est en cours
            var jOn='<table class="jeu" width="100" border="1" cellspacing="1" cellpadding="0">';       //trace la grille
            for(var l = 0; l < t; l++){
                jOn+='<tr>';
                for (var z = 0; z < t; z++){
                    if (image[l][z]===gris) {
                        imageDos[l][z]=gris;
                        jOn+='<td>'+imageDos[l][z]+'</td>';
                        continue;
                    }
                    if (l==coordX1&&z==coordY1) {
                        jOn+='<td>'+image[coordX1][coordY1]+'</td>';
                        continue;
                    }
                    if (l==coordX2&&z==coordY2) {
                        jOn+='<td>'+image[l][z]+'</td>';
                        continue;
                    }
                    else{
                        imageDos[l][z]=imageCourante(l,z);
                        jOn+='<td>'+imageDos[l][z]+'</td>';
                        continue;
                    }
                }
                jOn+='</tr>';
            }
            jOn+='</table>';
            jeuOn.innerHTML=jOn;
};
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //permet de gerer les scores incrementer et decrementer
//----------------------------------------------------------------------------------------------------------------------------------------------//
var score=function(j,g){                                       
    var point=document.getElementById("score");
    if (g=="+") {
        if (j==joueur1) {
            s1=s1+1;
            point.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center"style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'bleu.jpg\');"><strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center"><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
        }
        if (j==joueur2) {
            s2=s2+1;
            point.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center"><strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center" style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'bleu.jpg\');"><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
        }
    }
    if (g=="-") {
        if (j==joueur1) {
            if (s1==0) {
                s1=0;
                point.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center"><strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center" style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'bleu.jpg\');"><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
            }
            else{
                s1=s1-1;
                point.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center"><strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center" style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'bleu.jpg\');"><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
            }
        }
        if (j==joueur2) {
            if (s2==0) {
                s2=0;
                point.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center"style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'bleu.jpg\');"><strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center" ><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
            }
            else{
                s2=s2-1;
                point.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center"style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'bleu.jpg\');"><strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center"><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
            }
        }
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //permet de mettre les cartes speciales dans le tableau
//----------------------------------------------------------------------------------------------------------------------------------------------//
var carteSpec=function(chaine){
    var tab=[];
    switch(chaine){
        case "v":
            melange='<img src="Carte SpecC/parking.jpg" width="70" height="70" alt="Cars" />';
            tab.push('<img src="Carte SpecC/parking.jpg" width="70" height="70" alt="Cars" />');
            unique1='<img src="Carte SpecC/saratoga.JPG" width="70" height="70" alt="Cars" />';
            tab.push('<img src="Carte SpecC/saratoga.JPG" width="70" height="70" alt="Cars" />');
            unique2='<img src="Carte SpecC/LFA.jpg" width="70" height="70" alt="Cars" />';
            tab.push('<img src="Carte SpecC/LFA.jpg" width="70" height="70" alt="Cars" />');
            maudite1='<img src="Carte Speciale/maudite1.jpg" width="70" height="70" alt="Cars" />';
            tab.push('<img src="Carte Speciale/maudite1.jpg" width="70" height="70" alt="Cars" />');
            maudite2='<img src="Carte Speciale/maudite2.jpg" width="70" height="70" alt="Cars" />';
            tab.push('<img src="Carte Speciale/maudite2.jpg" width="70" height="70" alt="Cars" />');
            joker='<img src="Carte Speciale/joker.jpg" width="70" height="70" alt="Cars" />';
            tab.push('<img src="Carte Speciale/joker.jpg" width="70" height="70" alt="Cars" />');
            return tab;
            break;
        case "f":
            maudite1='<img src="Carte Speciale/maudite1.jpg" width="70" height="70" alt="Fruit" />';
            tab.push('<img src="Carte Speciale/maudite1.jpg" width="70" height="70" alt="Fruit" />');
            maudite2='<img src="Carte Speciale/maudite2.jpg" width="70" height="70" alt="Fruit" />';
            tab.push('<img src="Carte Speciale/maudite2.jpg" width="70" height="70" alt="Fruit" />');
            joker='<img src="Carte Speciale/joker.jpg" width="70" height="70" alt="Fruit" />';
            tab.push('<img src="Carte Speciale/joker.jpg" width="70" height="70" alt="Fruit" />');
            unique1='<img src="Carte SpecF/maypop.jpg" width="70" height="70" alt="Fruit" />';
            tab.push('<img src="Carte SpecF/maypop.jpg" width="70" height="70" alt="Fruit" />');
            melange='<img src="Carte SpecF/melange.jpg" width="70" height="70" alt="Fruit" />';
            tab.push('<img src="Carte SpecF/melange.jpg" width="70" height="70" alt="Fruit" />');
            unique2='<img src="Carte SpecF/sapote.jpg" width="70" height="70" alt="Fruit" />';
            tab.push('<img src="Carte SpecF/sapote.jpg" width="70" height="70" alt="Fruit" />');
            return tab;
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //Gestion carte speciales
//----------------------------------------------------------------------------------------------------------------------------------------------//
var gererCarteSpec=function(card,x,y){
    switch(card){
        case melange:                                                   //carte melange                                       
            gagne=false;
            image=shuffle(image);                                       //melange cartes
            return true;
            break;
        case maudite1:                                                  //carte maudite1
            gagne=false;
            gestionPoint="-";                                           //le signe de la gestion des points
            score(joueurCourant,gestionPoint);                          //met les scores a jour
            if (imgGagne.length!=0) {                                   //si il y a des images gagne
                image=chercheDansTab(image,gris);
            }                                                           //sinon juste melange les cartes
            image=shuffle(image);
            return true;
            break;
        case maudite2:                                                  //carte maudite1
            gagne=false;
            gestionPoint="-";                                           //le signe de la gestion des points
            score(joueurCourant,gestionPoint);                          //met les scores a jour
            if (imgGagne.length!=0) {                                   //si il y a des images gagne
                image=chercheDansTab(image,gris);
            }                                                           //sinon juste melange les cartes
            image=shuffle(image);
            return true;
            break;
        case unique1:                                                  //carte unique 1
            gagne=false;
            return true;
            break;
        case unique2:                                                  //carte unique 1
            gagne=false;
            return true;
            break;
        case joker:                                                     //joker
            image[x][y]=gris;
            gagne=true;                                                 //on gagne et on continue
            return true;
            break;
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //fonction aleatoire
//----------------------------------------------------------------------------------------------------------------------------------------------//
var aleatoire=function(n,m){
    return Math.floor(Math.random()*n+m);
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //permet de rechercher un element dans un tableau par exemple background gris quand image trouve
//----------------------------------------------------------------------------------------------------------------------------------------------//
var chercheDansTab=function(tab,r){
    var nbrC=2;                             //nombre d'image grises a chercher
    for(var i=0;i<tab.length;i++){
        for(var j=0;j<tab[i].length;j++){
            if (nbrC==0) {
                imgGagne.pop();             //on enleve dernier element du tableau
                return tab;
            }
            if (tab[i][j]==r) {                
                tab[i][j]=imgGagne[imgGagne.length-1];           //on remet l'image dans grille de jeu
                nbrC--;
                continue;
            }
        }
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //permet de rentrer les cartes dans le tableau
//----------------------------------------------------------------------------------------------------------------------------------------------//
var remplirTabImg=function(chaine){
    var n=aleatoire(29,1);                                  //genere carte aleatoire si grille plus grande que 8X8
    var tab=[];
    tab=tab.concat(carteSpec(chaine));                      //concatenation image speciale aux image de la grille
    var z=0                                                 //permet d'iter sur les images
    var i=1;                                                //iterateur d'image car indice image commence a 1
    switch(chaine){
        case "v":
            for (var j=0; j<t; j++){
                for(var l=0;l<t;l+=2){
                    if (i>=30&&i<=35) {                         //mettre image speciale dans le tableau
                        image[j][l]=tab[z];
                        image[j][l+1]=tab[z+1];
                        i=i+2;
                        z+=2;
                        continue;
                    }
                    if (i>=36) {
                        image[j][l]='<img src="Cars/V'+n+'.jpg" width="70" height="70" alt="Cars" />';          //image indice aleatoire
                        image[j][l+1]='<img src="Cars/V'+n+'.jpg" width="70" height="70" alt="Cars" />';
                        n=aleatoire(29,1);
                        continue;
                    }
                    else{
                        image[j][l]='<img src="Cars/V'+i+'.jpg" width="70" height="70" alt="Cars" />';          //rentre image iterer
                        image[j][l+1]='<img src="Cars/V'+i+'.jpg" width="70" height="70" alt="Cars" />';
                        i++;
                    }
                }   
           }    
           return image;
           break;
        case "f":
            for (var j=0; j<t; j++){
                for(var l=0;l<t;l+=2){
                    if (i>=30&&i<=35) {
                        image[j][l]=tab[z];
                        image[j][l+1]=tab[z+1];
                        i=i+2;
                        z+=2;
                        continue;
                    }
                    if (i>=36) {
                        image[j][l]='<img src="Fruit/IMG'+n+'.jpg" width="70" height="70" alt="Fruit" />';
                        image[j][l+1]='<img src="Fruit/IMG'+n+'.jpg" width="70" height="70" alt="Fruit" />';
                        n=aleatoire(29,1);
                        continue;
                    }
                    else{
                        image[j][l]='<img src="Fruit/IMG'+i+'.jpg" width="70" height="70" alt="Fruit" />';
                        image[j][l+1]='<img src="Fruit/IMG'+i+'.jpg" width="70" height="70" alt="Fruit" />';
                        i++;
                    }
                }   
           }    
           return image;
    }
};
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //fonction qui change la carte clicker et montre l'image
//----------------------------------------------------------------------------------------------------------------------------------------------//
var montre=function(i,j){                           //montre 1e carte
    if (cpt==1) {
        coordX1=i;                                  //enregistre coordonees
        coordY1=j;
        click=1;
        carte1=image[i][j];
        redessineGrille();                     //redessine la grille avec 1e image
    }
    if(cpt==2){
        coordX2=i;                                  //enregistre coordonnees 2e image
        coordY2=j;
        carte2=image[i][j];
        redessineGrille();                    //affiche grille avec 2e image
        comparaison(carte1,carte2);                 //compare les cartes
        cpt=0;                                      //vider les variables
        carte1='';
        carte2='';
        coordX2=undefined;
        coordY2=undefined;
        coordX1=undefined;
        coordY1=undefined;
        setTimeout(redessineGrille.bind(),1000);
        }
    cpt++;                                          //permet incrementation afin d'avoir 2 images 
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //Fonction qui verifie le nombre de carte trouve pour verifier si toutes les cartes sont passes
//----------------------------------------------------------------------------------------------------------------------------------------------//
var fin=function(){                                 //gere la fin du jeu
var longueur=(Math.pow(t,2)-6)/2;
    if (imgGagne.length===longueur) {               //si le nombre d'image gagne donne le bon ratio
        return true;
    }
    else{
        return false;
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //Fonction qui verifie le nombre de carte trouve pour verifier si toutes les cartes sont passes
//----------------------------------------------------------------------------------------------------------------------------------------------//
var gestGagnant=function(){                                 //Affiche qui est le gagnant
    var g=document.getElementById("score");
    if (s1>s2) {
        g.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center" style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'rouge.jpg\');"><strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center"style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'wood_texture.jpg\');"><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
        return;
    }
    if (s2>s1) {
        g.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center"style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'wood_texture.jpg\');"><strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center" style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'rouge.jpg\');"><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
        return;
    }
    else{
        g.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center" style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'vert.jpg\');"><strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center" style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'vert.jpg\');"><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //Fonction qui fait apparaitre le bouton du systeme
//----------------------------------------------------------------------------------------------------------------------------------------------//
var syst=function(){
    var choose=document.getElementById("ChooseButton");
    var SystemeChoisie='<p><input type="button" value="System Choose card" onclick="Javascript:coordImgSyst()"style="width:240px;height:50px;text-align: centermargin: -20px -50px; position:relative;top:2.5%; left:1%;" /></p>';
    choose.innerHTML=SystemeChoisie;
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //Fonction qui fait disparaitre le bouton du systeme
//----------------------------------------------------------------------------------------------------------------------------------------------//
var systOff=function(){
    var choose=document.getElementById("ChooseButton");
    var SystemeChoisie='';
    choose.innerHTML=SystemeChoisie;
    
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //Fonction qui genere des coordonnees d'image pour le systeme
//----------------------------------------------------------------------------------------------------------------------------------------------//
var coordImgSyst=function(){
    var x=aleatoire(7,0);
    var y=aleatoire(7,0);
    var i=0
    for (var i;i<=Math.pow(t,2);i++) {
        if (image[x][y]!= gris&&image[x][y]!=carte1){
            montre(x,y);
            break;
        }
        else{
            x=aleatoire(7,0);
            y=aleatoire(7,0);
            continue;
        }
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //Fonction qui place les joueurs dans un tableau 
//----------------------------------------------------------------------------------------------------------------------------------------------//
var placeJoueur=function(){
    var point=document.getElementById("score")
    joueur1="Joueur 1";
    if (joueur2!="Systeme"&&nbj==2) {
        joueur2="Joueur 2";
    }
    if (nbj==1) {
        joueur2="Systeme";
    }
    if (joueurCourant=="Systeme") {
        point.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center"><strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center"style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'bleu.jpg\');"><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
        syst();
    }
    if (joueurCourant=="Joueur 2") {
        point.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center"><strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center"style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'bleu.jpg\');"><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
    }
    if (joueurCourant=="Joueur 1") {
        point.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center"style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'bleu.jpg\');"<strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center"><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
    }
};
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //Fonction qui gere le tour des joueurs
//----------------------------------------------------------------------------------------------------------------------------------------------//
var gestJoueur=function(){
    var g=document.getElementById("score");
    if (joueurCourant==joueur1&&gagne==false&&joueur2=="Systeme") {
        gagne=true;
        joueurCourant=joueur2;
        g.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center" style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'wood_texture.jpg\');"><strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center" style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'bleu.jpg\');"><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
        syst();
    }
    if (joueurCourant==joueur2&&gagne==false&&joueur2=="Systeme"){ 
        gagne=true;
        joueurCourant=joueur1;
        g.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center" style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'bleu.jpg\');"><strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center"style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'wood_texture.jpg\');"><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
        systOff();
    }
    if (joueurCourant==joueur2&&gagne==false&&joueur2!="Systeme") {
        gagne=true;
        joueurCourant=joueur1;
        g.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center" style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'bleu.jpg\');"><strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center"style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'wood_texture.jpg\');"><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
    }
    if (joueurCourant==joueur1&&gagne==false&&joueur2!="Systeme") {
        gagne=true;
        joueurCourant=joueur2;
        g.innerHTML='<h3 ALIGN="center"><strong>SCORE</strong></h3><br></br></br><div Class="J1"ALIGN="center" style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'wood_texture.jpg\');"><strong><p>'+joueur1+'</p><p>'+s1+'</p></strong></div><br><div Class="J2"ALIGN="center" style="width: 150px;padding: 10px;border: 5px solid gray;margin: 0px;background-image:url(\'bleu.jpg\');"><strong><p>'+joueur2+'</p><p>'+s2+'</p></strong></div><div id="ChooseButton" ALIGN="center"></div>';
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------//
                                //Fonction test
//----------------------------------------------------------------------------------------------------------------------------------------------//
var testMemoire= function(){
  assert(8>=aleatoire(8,1)&&1<=aleatoire(8,1));
  assert(gererCarteSpec(maudite1)==true);
  assert(gererCarteSpec(gris)==false);
  assert(comparaison(maudite1,maudite1)==true); //fonction utilise au debut lors de la programmation pas partir les tests a moins de faire quelques modifications
  assert(comparaison(joker,maudite1)==false);   //meme chose pour celui-la 
  assert(fin()==false)                          //si toutes les images n'ont pas ete trouve;
  assert(fin()==true)                           //si toutes les images ont ete trouve.
  assert(image[i][j]!=undefined);               //image bien definit
  assert(joueurCourant==turn);                  //le jour qui debute est le bon place dans la grille.
  assert(carte1!=undefined||'');                //a tester quand jeu en cours
  assert(carte2!=undefined||'');                //a tester quand jeu en cours
  assert(imgGagne.length==0);                   //a tester en debut de jeu
  assert(imgGagne.length==((Math.pow(t,2)-6)/2)); //a tester si toutes les vraies images sont dans tab quand trouve
  assert(carteSpec("v").length==6);           //les cartes speciales sont rentree pour les voitures
  assert(carteSpec("f").length==6);           //les cartes speciales sont rentree pour les fruits
  assert(remplirTabImg(th)[5][5]!=undefined); //image existe;
  assert(remplirTabImg(th)[t][t]!=undefined); //Tous le tableau a des images.
  assert(chercheDansTab([2,5,7,8,3,2,7,8]).length==7);  //a utilise en faisant petite modification a cette fonction on enleve vraiment une image
  shuffle([[2,4,5],[2,4,5],[2,4,5],[2,4,5],[2,4,5]]);   //Si on test celle la mettre les alert du code dans le programme car en commentaire en ce moment
  assert(imageCourante(0,0)=='<img src="IMG_0003.jpg" width="70" height="70" alt="Waterfall" />'); //Si le joueur est le systeme
  assert(imageCourante(0,0)=='<img src="IMG_0003.jpg" width="70" height="70" alt="Waterfall" onclick="montre('+i+','+j+')" />');//Si le joueur est humain
}
//testMemoire();