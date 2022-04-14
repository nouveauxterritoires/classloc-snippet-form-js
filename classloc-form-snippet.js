
/*jshint esversion: 6 */

// TODO: Ajouter un peu de styles au formulaire

class ClasslocFormulaire {
    constructor( id ) {

        this.urlApi = "https://classloc.dev/api/NOMDELAROUTE";
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

    createNoticeSection(form){
        const noticeContainer = document.createElement('div');
        const notice = document.createElement('div');
        noticeContainer.classList.add('notice');
        notice.innerHTML = '<p>Les champs marqués d\'un * sont obligatoires</p>';
        noticeContainer.appendChild(notice);
        form.appendChild(noticeContainer);
    }

    createSendButton(form){
        const button = document.createElement('button');
        button.type = 'submit';
        button.innerHTML = 'Envoyer';

        form.appendChild(button);
    }

    createSection (form, value) {

        const section = document.createElement('details');
        section.className = 'form-section';
        section.setAttribute("id", value.title.id);

        const title = document.createElement('summary');
        title.innerHTML = value.title.title;
        title.setAttribute("role", "button");
        section.appendChild(title);

        const sectionContainer = document.createElement('div');

        Object.entries(value.content).forEach(([key,v])=>{
            if(v.type === 'select'){
                this.createSelect(sectionContainer, key, v);
            } else {
                this.createInput(sectionContainer, key, v);
            }

        });
        section.appendChild(sectionContainer);
        form.appendChild(section);

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

    createSelect(section, key, v) {
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
            'hebergement': {
                'title': {
                    'title': 'Hebergement',
                    'id': 'cl_titre'
                },
                'content' : {
                    'nom_du_batiment' : {
                        'type': 'text',
                        'label': "Nom de l'hébergement",
                        'placeholder': "Nom de l'hébergement",
                        'pattern': '^[a-zA-Z]{1,20}$',
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
                    'complement_adresse_du_meuble' : {
                        'type': 'text',
                        'label': "Complément d'adresse",
                        'placeholder': "Complément d'adresse",
                        'pattern': '^[0-9]{1,3} [a-zA-Z]{1,20}$',
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
                    'telephone' : {
                        'type': 'text',
                        'label': 'Téléphone',
                        'placeholder': 'Téléphone',
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
                    'nombre_maximal_de_personne' : {
                        'type': 'number',
                        'label': 'Nombre maximal de personnes susceptibles d\'être accueillies*',
                        'required': 'required',
                        'placeholder': 'Nombre maximal de personnes susceptibles d\'être accueillies',
                        'min': 0,
                        'max': 100,
                        'class': 'form-control'
                    },
                    'nombre_de_personne_classees' : {
                        'type': 'number',
                        'label': 'Nombre de personne classées*',
                        'required': 'required',
                        'placeholder': 'Nombre de personne classées',
                        'min': 0,
                        'max': 100,
                        'class': 'form-control'
                    },
                    'nombre_de_pieces' : {
                        'type': 'number',
                        'label': 'Nombre de pièces composant le meublé*',
                        'required': 'required',
                        'placeholder': 'Nombre de pièces composant le meublé',
                        'min': 0,
                        'max': 100,
                        'class': 'form-control'
                    },
                    'nombre_de_chambres' : {
                        'type': 'number',
                        'label': 'Nombre de chambres*',
                        'required': 'required',
                        'placeholder': 'Nombre de chambres',
                        'min': 0,
                        'max': 100,
                        'class': 'form-control'
                    },
                    'classement_actuel' : {
                        'type': 'select',
                        'label': 'Classement actuel*',
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
                        'label': 'Classement souhaité*',
                        'required': 'required',
                        'options': [
                            {'value': "", 'label': 'Sélectionnez le classement souhaité'},
                            {'value': 1, 'label': '1 étoile'},
                            {'value': 2, 'label': '2 étoiles'},
                            {'value': 3, 'label': '3 étoiles'},
                            {'value': 4, 'label': '4 étoiles'},
                            {'value': 5, 'label': '5 étoiles'}
                        ],
                        'class': 'form-control'
                    },
                    'surface_totale' : {
                        'type': 'number',
                        'label': 'Surface totale*',
                        'required': 'required',
                        'placeholder': 'Surface totale',
                        'min': 0,
                        'max': 100,
                        'step': ".01",
                        'class': 'form-control'
                    },
                    'surface_hsdb' : {
                        'type': 'number',
                        'label': 'Surface hors salle de bain et WC*',
                        'required': 'required',
                        'placeholder': 'Surface hors salle de bain et WC',
                        'min': 0,
                        'max': 100,
                        'step': ".01",
                        'class': 'form-control'
                    },
                    'demandeur_is_not_proprietaire' : {
                        'type': 'checkbox',
                        'label': 'Le demandeur n\'est pas propriétaire',
                        'placeholder': 'Le demandeur n\'est pas propriétaire',
                        'class': 'form-control'
                    }
                }
            },
            'proprietaire' : {
                'title': {
                    'title': 'Propriétaire',
                    'id': 'cl_titre'
                },
                'content' : {
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
                    'complement_adresse' : {
                        'type': 'text',
                        'label': "Complément d'adresse",
                        'placeholder': 'Complément d\'adresse',
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
                        'label': 'Adresse courriel',
                        'required': 'required',
                        'placeholder': 'exemple@gmail.com'
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
                    'siret': {
                        'type': 'text',
                        'label': 'SIRET/SIREN',
                        'placeholder': 'SIRET/SIREN',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    }
                }
            },
            'declarant' : {
                'title': {
                    'title': 'Déclarant',
                    'id': 'cl_titre'
                },
                'content' : {
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
                    'raison_sociale': {
                        'type': 'text',
                        'label': 'Raison Sociale',
                        'placeholder': 'Raison Sociale',
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
                    'complement_adresse' : {
                        'type': 'text',
                        'label': "Complément d'adresse",
                        'placeholder': 'Complément d\'adresse',
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
                    'autres_email' : {
                        'type': 'text',
                        'label': 'Autres courriels',
                        'placeholder': 'exemple@gmail.com, exemple2@free.fr, ...',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
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
                    'siret': {
                        'type': 'text',
                        'label': 'SIRET/SIREN',
                        'placeholder': 'SIRET/SIREN',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
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
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Authorization", "Bearer " + this.token);

        // Bind l'objet FormData et l'element formulaire
        const formData = new FormData( form );

        // En cas de succès
        XHR.addEventListener( "load", this.onSendFormSuccess(event) );

        // En cas d'erreur
        XHR.addEventListener( "error", this.onSendFormError(event) );

        // création de notre requête avec les données du formulaire
        XHR.open( "POST", this.urlapi );

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


