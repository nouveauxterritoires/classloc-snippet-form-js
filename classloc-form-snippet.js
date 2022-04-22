
/*jshint esversion: 6 */

// TODO: Ajouter un peu de styles au formulaire

class ClasslocFormulaire
{
    constructor( id )
    {

        this.urlApi = "https://classloc.dev/api/v1/snippet";
        this.config = this.setupForm();
        this.token  = this.getToken();

        const form = document.createElement('form');
        form.className = 'classloc-form container';
        this.createNoticeSection(form);

        Object.entries(this.config).forEach(([key,value])=>{
            this.createSection(form,value);
        });

        this.createSendButton(form);

        // TODO: Ajouter la validation des données avant d'envoyer les données du formulaire via l'API (les champs sont déjà censés se valider via HTML5,
        //  là je parle de validation supplélemtaire, qui pourraient correspondre au métier). Pour afficher les messages d'erreur, il faudra remplir la section notice via une méthode.
        // TODO: Ajouter l'event ajax qui va envoyer les données du formulaire via l'API

        form.addEventListener('submit',(e)=>{
            e.preventDefault();
            this.sendForm(form);
        });

        document.getElementById(id).appendChild(form);

    }

    getToken() {
        return document.getElementById("clossloc-form").getAttribute('data-cltoken');
    }

    createNoticeSection(form)
    {
        const noticeContainer = document.createElement('div');
        const notice = document.createElement('div');
        noticeContainer.classList.add('notice');
        notice.innerHTML = '<p>Les champs marqués d\'un * sont obligatoires</p>';
        noticeContainer.appendChild(notice);
        form.appendChild(noticeContainer);
    }

    createSendButton(form)
    {
        const button = document.createElement('button');
        button.type = 'submit';
        button.innerHTML = 'Envoyer';

        form.appendChild(button);
    }

    createSection (form, value)
    {
        const section = document.createElement('details');
        section.className = 'form-section';
        section.setAttribute("id", value.title.id);

        const title = document.createElement('summary');
        title.innerHTML = value.title.title;
        title.setAttribute("role", "button");
        section.appendChild(title);

        const sectionContainer = document.createElement('div');

        Object.entries(value.content).forEach(([key,v])=>{
            if(v.type === 'chapter'){
                this.createChapter(sectionContainer, key, v);
            } else if(v.type === 'select'){
                this.createSelect(sectionContainer, key, v);
            } else {
                this.createInput(sectionContainer, key, v);
            }
        });

        section.appendChild(sectionContainer);
        form.appendChild(section);
    }

    createChapter(section, key, v)
    {
        const strong = document.createElement('strong');
        strong.innerHTML = v.chapter;

        const divStrong = document.createElement('div');
        divStrong.setAttribute('id', key);

        divStrong.appendChild(strong);
        section.appendChild(divStrong);
    }

    createInput(section, key, v) {
        const input = document.createElement('input');
        const label = document.createElement('label');

        label.innerHTML = v.label;

        input.setAttribute("id", key);
        if( v.type ) { input.setAttribute("type", v.type); }
        if( v.name ) { input.setAttribute("name", v.name); }
        if( v.placeholder ) { input.setAttribute("placeholder", v.placeholder); }
        if( v.value ) { input.setAttribute("value", v.value); }
        if( v.required ) { input.setAttribute("required", v.required); }
        if( v.pattern ) { input.setAttribute("pattern", v.pattern); }
        if( v.min ) { input.setAttribute("min", v.min); }
        if( v.max ) { input.setAttribute("max", v.max); }
        if( v.step ) { input.setAttribute("step", v.step); }

        //TODO : traiter le cas d'un select ou des autre champs spécifiques

        label.appendChild(input);
        section.appendChild(label);
    }

    createSelect(section, key, v)
    {
        const select = document.createElement('select');
        const label = document.createElement('label');
        const options = v.options;
        label.innerHTML = v.label;

        if( v.id ) { select.setAttribute("id", v.id); }
        if( v.name ) { select.setAttribute("name", v.name); }
        if( v.placeholder ) { select.setAttribute("placeholder", v.placeholder); }
        if( v.required ) { select.setAttribute("required", v.required); }

        Object.entries(options).forEach(([key,option])=>{
            const opt = document.createElement("option");
            opt.value = option.value;
            opt.text = option.label;
            select.add(opt);
        });

        label.appendChild(select);
        section.appendChild(label);
    }

    setupForm () {

        // TODO: mettre les bons champs que tu m'as envoyé

        return {
            'proprietaire' : {
                'title': {
                    'title': '1. Informations Personnelles',
                    'id': 'cl_titre'
                },
                'content' : {
                    'chapter_1': {
                        'type': 'chapter',
                        'chapter': 'Propriétaire',
                        'id': 'chapter_1'
                    },
                    'civilite' : {
                        'type': 'select',
                        'label': 'Civilité*',
                        'required': 'required',
                        'options': [
                            {'value': "", 'label': 'Sélectionnez votre civilité'},
                            {'value': 'Monsieur', 'label': 'Monsieur'},
                            {'value': 'Monsieur et Madame', 'label': 'Monsieur et Madame'},
                            {'value': 'Madame', 'label': 'Madame'},
                            {'value': 'Mademoiselle', 'label': 'Mademoiselle'},
                            {'value': 'ND', 'label': 'ND'},
                        ],
                        'class': 'form-control'
                    },
                    'nom' : {
                        'type': 'text',
                        'label': 'Nom*',
                        'required': 'required',
                        'placeholder': 'Nom',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'prenom' : {
                        'type': 'text',
                        'label': 'Prénom*',
                        'required': 'required',
                        'placeholder': 'Prénom',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'adresse' : {
                        'type': 'text',
                        'label': 'Adresse*',
                        'required': 'required',
                        'placeholder': 'Adresse',
                        'pattern': '^[0-9]{1,3} [a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'code_postal' : {
                        'type': 'text',
                        'label': 'Code postal*',
                        'required': 'required',
                        'placeholder': 'Code postal',
                        'pattern': '^[0-9]{5}$',
                        'class': 'form-control'
                    },
                    'ville' : {
                        'type': 'text',
                        'label': 'Commune*',
                        'required': 'required',
                        'placeholder': 'Commune',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'pays' : {
                        'type': 'text',
                        'label': 'Pays*',
                        'required': 'required',
                        'placeholder': 'Pays',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'telephone' : {
                        'type': 'text',
                        'label': 'Téléphone principal*',
                        'required': 'required',
                        'placeholder': 'Téléphone principal',
                        'pattern': '^[0-9]{10}$',
                        'class': 'form-control'
                    },
                    'telephone2' : {
                        'type': 'text',
                        'label': 'Téléphone secondaire',
                        'placeholder': 'Téléphone secondaire',
                        'pattern': '^[0-9]{10}$',
                        'class': 'form-control'
                    },
                    'email' : {
                        'type': 'email',
                        'label': 'Adresse courriel*',
                        'required': 'required',
                        'placeholder': 'exemple@gmail.com'
                    },
                    'chapter_2': {
                        'type': 'chapter',
                        'chapter': 'Mandataire (si le propriétaire n\'est pas présent le jour de la visite)',
                        'id': 'chapter_2'
                    },
                    'civilite_mandataire' : {
                        'type': 'select',
                        'label': 'Civilité',
                        'required': 'required',
                        'options': [
                            {'value': "", 'label': 'Sélectionnez votre civilité'},
                            {'value': 'Monsieur', 'label': 'Monsieur'},
                            {'value': 'Monsieur et Madame', 'label': 'Monsieur et Madame'},
                            {'value': 'Madame', 'label': 'Madame'},
                            {'value': 'Mademoiselle', 'label': 'Mademoiselle'},
                            {'value': 'ND', 'label': 'ND'},
                        ],
                        'class': 'form-control'
                    },
                    'nom_mandataire' : {
                        'type': 'text',
                        'label': 'Nom',
                        'required': 'required',
                        'placeholder': 'Nom',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'prenom_mandataire' : {
                        'type': 'text',
                        'label': 'Prénom',
                        'required': 'required',
                        'placeholder': 'Prénom',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'raison_sociale_mandataire': {
                        'type': 'text',
                        'label': 'Raison Sociale',
                        'placeholder': 'Raison Sociale',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'adresse_mandataire' : {
                        'type': 'text',
                        'label': 'Adresse',
                        'required': 'required',
                        'placeholder': 'Adresse',
                        'pattern': '^[0-9]{1,3} [a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'code_postal_mandataire' : {
                        'type': 'text',
                        'label': 'Code postal',
                        'required': 'required',
                        'placeholder': 'Code postal',
                        'pattern': '^[0-9]{5}$',
                        'class': 'form-control'
                    },
                    'ville_mandataire' : {
                        'type': 'text',
                        'label': 'Ville',
                        'required': 'required',
                        'placeholder': 'Commune',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'pays_mandataire' : {
                        'type': 'text',
                        'label': 'Pays',
                        'required': 'required',
                        'placeholder': 'Pays',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'telephone_mandataire' : {
                        'type': 'text',
                        'label': 'Téléphone',
                        'required': 'required',
                        'placeholder': 'Téléphone',
                        'pattern': '^[0-9]{10}$',
                        'class': 'form-control'
                    },
                    'email_mandataire' : {
                        'type': 'email',
                        'label': 'Adresse courriel',
                        'required': 'required',
                        'placeholder': 'exemple@gmail.com'
                    }
                }
            },
            'hebergement': {
                'title': {
                    'title': '2. Informations Meublé',
                    'id': 'cl_titre'
                },
                'content' : {
                    'chapter_3': {
                        'type': 'chapter',
                        'chapter': 'Identification',
                        'id': 'chapter_3'
                    },
                    'nom_du_batiment' : {
                        'type': 'text',
                        'label': "Nom du meublé (Précisez bâtiment et n° d'appartement)",
                        'placeholder': "Nom du meublé",
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'type_de_logement_du_meuble' : {
                        'type': 'select',
                        'label': 'Type de logement du meublé*',
                        'required': 'required',
                        'options': [
                            {'value': "", 'label': 'Sélectionnez le type de logement du meublé'},
                            {'value': 'Appartement', 'label': 'Appartement'},
                            {'value': 'Appartement Studio', 'label': 'Appartement Studio'},
                            {'value': 'Studio', 'label': 'Studio'},
                            {'value': 'Studio Mezzanine', 'label': 'Studio Mezzanine'},
                            {'value': 'Villa', 'label': 'Villa'},
                            {'value': 'Chalet', 'label': 'Chalet'},
                            {'value': '1/2 Chalet', 'label': '1/2 Chalet'},
                            {'value': 'Ferme', 'label': 'Ferme'},
                            {'value': 'Maison', 'label': 'Maison'},
                            {'value': 'Studio Cabine', 'label': 'Studio Cabine'},
                            {'value': 'Chambre', 'label': 'Chambre'},
                            {'value': 'Autre', 'label': 'Autre'}
                        ],
                        'class': 'form-control'
                    },
                    'etage' : {
                        'type': 'select',
                        'label': 'Etage*',
                        'required': 'required',
                        'options': [
                            {'value': "", 'label': 'Sélectionnez l\'étage'},
                            {'value': 0, 'label': 'RDC / RDJ'},
                            {'value': 1, 'label': '1'},
                            {'value': 2, 'label': '2'},
                            {'value': 3, 'label': '3'},
                            {'value': 4, 'label': '4'}
                        ],
                        'class': 'form-control'
                    },
                    'adresse_du_meuble' : {
                        'type': 'text',
                        'label': 'Adresse*',
                        'required': 'required',
                        'placeholder': 'Adresse',
                        'pattern': '^[0-9]{1,3} [a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'ville' : {
                        'type': 'text',
                        'label': 'Commune*',
                        'required': 'required',
                        'placeholder': 'Commune',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'surface_totale' : {
                        'type': 'number',
                        'label': 'Surface totale de l’hébergement (en m2)',
                        'required': '',
                        'placeholder': 'Surface totale de l’hébergement (en m2)',
                        'min': 0,
                        'max': 100,
                        'step': ".01",
                        'class': 'form-control'
                    },
                    'surface_hsdb' : {
                        'type': 'number',
                        'label': 'Surface hors salle de bain et toilettes (en m2)',
                        'required': '',
                        'placeholder': 'Surface hors salle de bain et toilettes (en m2)',
                        'min': 0,
                        'max': 100,
                        'step': ".01",
                        'class': 'form-control'
                    },
                    'nombre_de_pieces' : {
                        'type': 'number',
                        'label': 'Nombre de pièces composant le meublé*',
                        'required': 'required',
                        'placeholder': 'Nombre de pièces composant le meublé',
                        'min': 1,
                        'max': 100,
                        'class': 'form-control'
                    },
                    'nombre_de_personne_classees' : {
                        'type': 'number',
                        'label': 'Nombre de personne classées*',
                        'required': 'required',
                        'placeholder': 'Nombre de personne classées',
                        'min': 1,
                        'max': 100,
                        'class': 'form-control'
                    },
                    'chapter_4': {
                        'type': 'chapter',
                        'chapter': 'Classement',
                        'id': 'chapter_4'
                    },
                    'classement_actuel' : {
                        'type': 'select',
                        'label': 'Classement actuel de votre hébergement*',
                        'required': 'required',
                        'options': [
                            {'value': "", 'label': 'Sélectionnez le classement actuel'},
                            {'value': 0, 'label': 'Non classé'},
                            {'value': 1, 'label': '1 étoile'},
                            {'value': 2, 'label': '2 étoiles'},
                            {'value': 3, 'label': '3 étoiles'},
                            {'value': 4, 'label': '4 étoiles'},
                            {'value': 5, 'label': '5 étoiles'}
                        ],
                        'class': 'form-control'
                    },
                    'classement_souhaite' : {
                        'type': 'select',
                        'label': 'Classement demandé*',
                        'required': 'required',
                        'options': [
                            {'value': "", 'label': 'Sélectionnez le classement souhaité'},
                            {'value': 0, 'label': 'Ne sait pas'},
                            {'value': 1, 'label': '1 étoile'},
                            {'value': 2, 'label': '2 étoiles'},
                            {'value': 3, 'label': '3 étoiles'},
                            {'value': 4, 'label': '4 étoiles'},
                            {'value': 5, 'label': '5 étoiles'}
                        ],
                        'class': 'form-control'
                    },
                }
            },
            'tarif': {
                'title': {
                    'title': '3. Modalités',
                    'id': 'cl_titre'
                },
                'content': {
                    'chapter_5': {
                        'type': 'chapter',
                        'chapter': 'Tarif',
                        'id': 'chapter_5'
                    },
                    'tarif' : {
                        'type': 'number',
                        'label': 'Suivant les spécificités de votre hébergement, la visite de classement par %nom de l’organisme% ' +
                            'vous sera facturée %prix% Euros. La complétion de cette présente demande n’engage en rien les deux parties.',
                        'required': 'required',
                        'min': 0,
                        'max': 100,
                        'class': 'form-control'
                    },
                    'chapter_6': {
                        'type': 'chapter',
                        'chapter': 'Acceptation',
                        'id': 'chapter_6'
                    },
                    'demandeur_check_ref_atout_france' : {
                        'type': 'checkbox',
                        'label': 'Le demandeur déclare avoir pris préalablement connaissance du référentiel détaillant les critères de classement des meublés de tourisme publié par Atout France.',
                        'class': 'form-control',
                        'required': 'required'
                    },
                    'check_validate' : {
                        'type': 'checkbox',
                        'label': 'En validant cette demande j\'accepte les mentions légales du site et accepte être contacté-e à propos de ma demande.',
                        'class': 'form-control',
                        'required': 'required'
                    }
                }
            }
        };
    }

    validate () {

    }

    sendForm () {
        // TODO : Créer les routes API pour la création des demandes de classement. -> Il me faut le format de données pour les envoyer. Coté serveur, il faudrait conditionner l'enregistrements des données à la clé API ET au domaine de provencance. Par défaut c'est l'id qui sera la clé dans le POST
        const XHR = new XMLHttpRequest();
        XHR.setRequestHeader("Accept", "application/json");
        XHR.setRequestHeader("Authorization", "Bearer " + this.token);

        // Bind l'objet FormData et l'element formulaire
        const formData = new FormData( form );

        var dataExemple = {
            'data': {
                'organismeId': 3,
                'eligDemandee': 3,
                'capClassee': 10,
                'nbPieceSupp': 13 - 1,
                'owner': {
                    'civility': 'Monsieur',
                    'firstName': 'Julien',
                    'lastName': 'Dignat',
                    'mail': 'juliend@nouveauxterritoires.fr',
                    'phone': '09 78 63 04 29',
                    'phone2': '06 98 07 82 20',
                    'buisinessName': null,
                    'address': '55 Bd Cabassud',
                    'postalCode': '13010',
                    'city': 'Marseille',
                    'country': 'France'
                },
                'applicant': {
                    'civility': null,
                    'firstName': null,
                    'lastName': null,
                    'mail': 'support@nouveauxterritoires.fr',
                    'phone': '09 78 63 04 29',
                    'buisinessName': 'Nouveaux Territoires',
                    'address': '33 rue Julia',
                    'postalCode': '13005',
                    'city': 'Marseille',
                    'country': 'France'
                },
                'accommodation': {
                    'name': 'NT',
                    'floor': 1,
                    'type': 'Studio',
                    'address': '36 rue Maille',
                    'city': 'Marseille',
                    'surface': 80.3,
                    'surfaceHsdb': 76.2,
                    'nbPersonsClasse': 10,
                    'nbPiecesTot': 13,
                    'currentRanking': '2'
                }
            }
        };

        // En cas de succès
        XHR.addEventListener( "load", this.onSendFormSuccess(event) );

        // En cas d'erreur
        XHR.addEventListener( "error", this.onSendFormError(event) );

        // création de notre requête avec les données du formulaire
        XHR.open( "POST", this.urlApi );

        XHR.send( formData );
    }

    onSendFormSuccess (event) {
        // TODO : Masquer le formulaire et afficher un message de succès dans le bloc notice
        console.log(event.target.responseText);
    }

    onSendFormError (event) {
        // TODO : Ajouter l'erreur au bloc notice prévu à cet effet
        console.log(event.target.responseText);
    }
}

const form = new ClasslocFormulaire("clossloc-form");


