
/*jshint esversion: 6 */

// TODO: Ajouter un peu de styles au formulaire

class ClasslocFormulaire {
    constructor( id ) {

        this.config = this.setupForm();

        const form = document.createElement('form');

        this.createNoticeSection(form);

        Object.entries(this.config).forEach(([key,value])=>{
            this.createSection(form,value);
        });

        this.createSendButton(form);

        // TODO: Ajouter la validation des données avant d'envoyer les données du formulaire via l'API (les champs sont déjà censés se valider via HTML5,
        //  là je parle de validation supplélemtaire, qui pourraient correspondre au métier). Pour afficher les messages d'erreur, il faudra remplir la section notice via une méthode.
        // TODO: Ajouter l'event ajax qui va envoyer les données du formulaire via l'API

        document.getElementById(id).appendChild(form);

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

        const section = document.createElement('section');
        section.className = 'form-section';
        section.setAttribute("id", value.title.id);

        const title = document.createElement('h3');
        title.innerHTML = value.title.title;
        section.appendChild(title);

        Object.entries(value.content).forEach(([key,v])=>{
            if(v.type === 'select'){
                this.createSelect(section,v);
            } else {
                this.createInput(section,v);
            }

        });

        form.appendChild(section);

    }

    createInput(section, v) {
        const input = document.createElement('input');
        const label = document.createElement('label');
        label.innerHTML = v.label;

        if( v.id ) { input.setAttribute("id", v.id); }
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

    createSelect(section, v) {
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
                        'required': false,
                        'placeholder': "Nom de l'hébergement",
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'adresse_du_meuble' : {
                        'type': 'text',
                        'label': 'Adresse',
                        'required': true,
                        'placeholder': 'Adresse',
                        'pattern': '^[0-9]{1,3} [a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'complement_adresse_du_meuble' : {
                        'type': 'text',
                        'label': "Complément d'adresse",
                        'required': false,
                        'placeholder': "Complément d'adresse",
                        'pattern': '^[0-9]{1,3} [a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'etage' : {
                        'type': 'select',
                        'label': 'Etage',
                        'required': true,
                        'placeholder': 'Sélectionnez l\'étage',
                        'options': [
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
                        'required': false,
                        'placeholder': 'Téléphone',
                        'pattern': '^[0-9]{5}$',
                        'class': 'form-control'
                    },
                    'ville' : {
                        'type': 'text',
                        'label': 'Commune',
                        'required': true,
                        'placeholder': 'Commune',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'type_de_logement_du_meuble' : {
                        'type': 'select',
                        'label': 'Type de logement du meublé',
                        'required': true,
                        'placeholder': 'Sélectionnez le type de logement du meublé',
                        'options': [
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
                        'label': 'Nombre maximal de personnes susceptibles d\'être accueillies',
                        'required': true,
                        'placeholder': 'Nombre maximal de personnes susceptibles d\'être accueillies',
                        'min': 0,
                        'max': 100,
                        'class': 'form-control'
                    },
                    'nombre_de_personne_classees' : {
                        'type': 'number',
                        'label': 'Nombre de personne classées',
                        'required': true,
                        'placeholder': 'Nombre de personne classées',
                        'min': 0,
                        'max': 100,
                        'class': 'form-control'
                    },
                    'nombre_de_pieces' : {
                        'type': 'number',
                        'label': 'Nombre de pièces composant le meublé',
                        'required': true,
                        'placeholder': 'Nombre de pièces composant le meublé',
                        'min': 0,
                        'max': 100,
                        'class': 'form-control'
                    },
                    'nombre_de_chambres' : {
                        'type': 'number',
                        'label': 'Nombre de chambres',
                        'required': true,
                        'placeholder': 'Nombre de chambres',
                        'min': 0,
                        'max': 100,
                        'class': 'form-control'
                    },
                    'classement_actuel' : {
                        'type': 'select',
                        'label': 'Classement actuel',
                        'required': true,
                        'placeholder': 'Classement actuel',
                        'options': [
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
                        'label': 'Classement souhaité',
                        'required': true,
                        'placeholder': 'Classement souhaité',
                        'options': [
                            {'value': 0, 'label': 'Non classé'},
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
                        'label': 'Surface totale',
                        'required': true,
                        'placeholder': 'Surface totale',
                        'min': 0,
                        'max': 100,
                        'step': ".01",
                        'class': 'form-control'
                    },
                    'surface_hsdb' : {
                        'type': 'number',
                        'label': 'Surface hors salle de bain et WC',
                        'required': true,
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
                        'label': 'Nom',
                        'required': true,
                        'placeholder': 'Nom',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'prenom' : {
                        'type': 'text',
                        'label': 'Prénom',
                        'required': true,
                        'placeholder': 'Prénom',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'adresse' : {
                        'type': 'text',
                        'label': 'Adresse',
                        'required': true,
                        'placeholder': 'Adresse',
                        'pattern': '^[0-9]{1,3} [a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'complement_adresse' : {
                        'type': 'text',
                        'label': "Complément d'adresse",
                        'required': false,
                        'placeholder': 'Complément d\'adresse',
                        'pattern': '^[0-9]{1,3} [a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'code_postal' : {
                        'type': 'text',
                        'label': 'Code postal',
                        'required': true,
                        'placeholder': 'Code postal',
                        'pattern': '^[0-9]{5}$',
                        'class': 'form-control'
                    },
                    'ville' : {
                        'type': 'text',
                        'label': 'Commune',
                        'required': true,
                        'placeholder': 'Commune',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'pays' : {
                        'type': 'text',
                        'label': 'Pays',
                        'required': true,
                        'placeholder': 'Pays',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'telephone' : {
                        'type': 'text',
                        'label': 'Téléphone principal',
                        'required': true,
                        'placeholder': 'Téléphone principal',
                        'pattern': '^[0-9]{10}$',
                        'class': 'form-control'
                    },
                    'telephone2' : {
                        'type': 'text',
                        'label': 'Téléphone secondaire',
                        'required': false,
                        'placeholder': 'Téléphone secondaire',
                        'pattern': '^[0-9]{10}$',
                        'class': 'form-control'
                    },
                    'email' : {
                        'type': 'email',
                        'label': 'Adresse courriel',
                        'required': true,
                    },
                    'civilite' : {
                        'type': 'select',
                        'label': 'Civilité',
                        'required': true,
                        'placeholder': 'Sélectionnez votre civilité',
                        'options': [
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
                        'required': false,
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
                        'label': 'Nom',
                        'required': true,
                        'placeholder': 'Nom',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'prenom' : {
                        'type': 'text',
                        'label': 'Prénom',
                        'required': true,
                        'placeholder': 'Prénom',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'raison_sociale': {
                        'type': 'text',
                        'label': 'Raison Sociale',
                        'required': false,
                        'placeholder': 'Raison Sociale',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'adresse' : {
                        'type': 'text',
                        'label': 'Adresse',
                        'required': true,
                        'placeholder': 'Adresse',
                        'pattern': '^[0-9]{1,3} [a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'complement_adresse' : {
                        'type': 'text',
                        'label': "Complément d'adresse",
                        'required': false,
                        'placeholder': 'Complément d\'adresse',
                        'pattern': '^[0-9]{1,3} [a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'code_postal' : {
                        'type': 'text',
                        'label': 'Code postal',
                        'required': true,
                        'placeholder': 'Code postal',
                        'pattern': '^[0-9]{5}$',
                        'class': 'form-control'
                    },
                    'ville' : {
                        'type': 'text',
                        'label': 'Commune',
                        'required': true,
                        'placeholder': 'Commune',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'pays' : {
                        'type': 'text',
                        'label': 'Pays',
                        'required': true,
                        'placeholder': 'Pays',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'telephone' : {
                        'type': 'text',
                        'label': 'Téléphone principal',
                        'required': true,
                        'placeholder': 'Téléphone principal',
                        'pattern': '^[0-9]{10}$',
                        'class': 'form-control'
                    },
                    'telephone2' : {
                        'type': 'text',
                        'label': 'Téléphone secondaire',
                        'required': false,
                        'placeholder': 'Téléphone secondaire',
                        'pattern': '^[0-9]{10}$',
                        'class': 'form-control'
                    },
                    'email' : {
                        'type': 'email',
                        'label': 'Adresse courriel',
                        'required': true,
                        'placeholder': 'exemple@gmail.com'
                    },
                    'autres_email' : {
                        'type': 'text',
                        'label': 'Autres courriels',
                        'required': false,
                        'placeholder': 'exemple@gmail.com, exemple2@free.fr, ...',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'civilite' : {
                        'type': 'select',
                        'label': 'Civilité',
                        'required': true,
                        'placeholder': 'Sélectionnez votre civilité',
                        'options': [
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
                        'required': false,
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

    sendDataToClassLoc () {

    }
}

const form = new ClasslocFormulaire("clossloc-form");


