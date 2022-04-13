
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
            this.createInput(section,v);
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
        if( v.required ) { input.setAttribute("required", v.required); }

        //TODO : traiter le cas d'un select ou des autre champs spécifiques

        label.appendChild(input);
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
                    'adresse_du_meuble' : {
                        'type': 'text',
                        'label': 'Adresse du meuble',
                        'required': true,
                        'placeholder': 'Adresse du meuble',
                        'pattern': '^[0-9]{1,3} [a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'nom_du_batiment' : {
                        'type': 'text',
                        'label': 'Nom du batiment',
                        'required': true,
                        'placeholder': 'Nom du batiment',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'etage' : {
                        'type': 'number',
                        'label': 'Etage',
                        'required': true,
                        'placeholder': 'Etage',
                        'min': 0,
                        'max': 100,
                        'class': 'form-control'
                    },
                    'numero' : {
                        'type': 'number',
                        'label': 'Numéro',
                        'required': true,
                        'placeholder': 'Numéro',
                        'min': 0,
                        'max': 100,
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
                        'label': 'Ville',
                        'required': true,
                        'placeholder': 'Ville',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'denomination_commerciale' : {
                        'type': 'text',
                        'label': 'Dénomination commerciale',
                        'required': true,
                        'placeholder': 'Dénomination commerciale',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'nombre_de_personne_classees' : {
                        'type': 'number',
                        'label': 'Nombre de personne classees',
                        'required': true,
                        'placeholder': 'Nombre de personne classees',
                        'min': 0,
                        'max': 100,
                        'class': 'form-control'
                    },
                    'classement_actuel' : {
                        'type': 'number',
                        'label': 'Classement actuel',
                        'required': true,
                        'placeholder': 'Classement actuel',
                        'min': 0,
                        'max': 5,
                        'class': 'form-control'
                    },
                    'classement_souhaite' : {
                        'type': 'number',
                        'label': 'Classement souhaite',
                        'required': true,
                        'placeholder': 'Classement souhaite',
                        'min': 0,
                        'max': 5,
                        'class': 'form-control'
                    },
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
                    'adresse' : {
                        'type': 'text',
                        'label': 'Adresse',
                        'required': true,
                        'placeholder': 'Adresse',
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
                        'label': 'Ville',
                        'required': true,
                        'placeholder': 'Ville',
                        'pattern': '^[a-zA-Z]{1,20}$',
                        'class': 'form-control'
                    },
                    'telephone' : {
                        'type': 'text',
                        'label': 'Téléphone',
                        'required': true,
                        'placeholder': 'Téléphone',
                        'pattern': '^[0-9]{10}$',
                        'class': 'form-control'
                    },
                    'email' : {
                        'type': 'email',
                        'label': 'Email',
                        'required': 'required',
                    },
                    'civilite' : {
                        'type': 'select',
                        'label': 'Civilité',
                        'required': true,
                        'placeholder': 'Civilité',
                        'options': [
                            {'value': 'Monsieur', 'label': 'Monsieur'},
                            {'value': 'Madame', 'label': 'Madame'},
                            {'value': 'Mademoiselle', 'label': 'Mademoiselle'},
                        ],
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

const form = new ClasslocFormulaire("app");


