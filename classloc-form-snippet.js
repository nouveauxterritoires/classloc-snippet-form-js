
/*jshint esversion: 6 */

class ClasslocFormulaire {
    constructor( id ) {

        this.config = this.setupForm();

        const form = document.createElement('form');


        Object.entries(this.config).forEach(([key,value])=>{
            this.createSection(form,value);
        });

        const button = document.createElement('button');
        button.value = "Upload";
        button.disabled = true;



        const input = document.createElement('input');
        input.placeholder = 'Path to data';
        input.oninput = () => this.validate();

        this.input = input;
        this.button = button;


        form.appendChild(input);
        form.appendChild(button);
        document.getElementById(id).appendChild(form);

    }

    createSection (form, value) {

        console.log(value.content);

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
                    },/*
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
                    },*/
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
                    },/*
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
                    }*/
                }
            }
        };
    }

    validate () {

        const a = document.createElement('a');
        a.href = this.input.value;
        this.button.disabled = !(a.host && a.host !== window.location.host);

    }

    send () {

    }
}



const form = new ClasslocFormulaire("app");


