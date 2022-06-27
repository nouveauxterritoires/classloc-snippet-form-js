
/*jshint esversion: 6 */

// TODO: Ajouter un peu de styles au formulaire

class ClasslocFormulaire
{
    constructor( id )
    {

        this.urlApi = "https://classloc.dev/api/v1/create_demand";
        this.config = this.setupForm();
        this.token  = this.getToken();

        const form = document.createElement('form');
        form.className = 'classloc-form container classement';
        // this.createNoticeSection(form);

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

    createNoticeSection(section, v)
    {
        // const noticeContainer = document.createElement('div');
        // const notice = document.createElement('div');
        // noticeContainer.classList.add('notice');
        // notice.innerHTML = '<p>Ces champs sont indicatifs. L\'opérateur de classement vérifiera et/ou ajoutera les champs manquants lors de la visite d\'inspection.</p>';
        // noticeContainer.appendChild(notice);
        // form.appendChild(noticeContainer);
        const notice = document.createElement('p');
        notice.innerText = v.notice;
        section.appendChild(notice);
    }

    createSendButton(form)
    {
        const button = document.createElement('button');
        button.type = 'submit';
        button.innerHTML = 'Envoyer';

        form.appendChild(button);
    }

    createTitle(section, v)
    {
        console.log(v);
        const title = document.createElement(v.balise);
        if(v.balise === 'h2'){
            title.innerHTML = v.title +
                "<div class='pagination'>" +
                "<span class='"+v.page1+"'>1</span>" +
                "<span class='"+v.page2+"'>2</span>" +
                "<span class='"+v.page3+"'>✓</span>" +
                "</div>"
            ;
        } else {
            title.innerHTML = v.subTitle;
        }
        section.appendChild(title);
    }

    createSection(form, value)
    {
        const section = document.createElement('section');
        section.setAttribute("class", value.title.class);
        this.createTitle(section, value.title);
        if(value.title.notice){
            this.createNoticeSection(section, value.title);
        }

        const sectionContainer = document.createElement('div');

        Object.entries(value.content).forEach(([key,v])=>{
            if(key === 'not-proprietaire'){
                this.createInput(sectionContainer, key, v);
            } else {
                this.createBlocform(sectionContainer, key, v);
            }
        });

        section.appendChild(sectionContainer);
        form.appendChild(section);
    }

    createBlocform(section, key, v)
    {
        const blocform = document.createElement('div');
        blocform.setAttribute("class", 'blocform');

        Object.entries(v).forEach(([key,v])=>{
            if(key.includes('blocflex')) {
                this.createBlocflex(blocform, key, v);
            } else {
                if(key.includes('sub-title')) {
                    this.createTitle(blocform, v);
                } else if(key.includes('text')) {
                    this.createText(blocform, v);
                } else {
                    this.createInput(blocform, key, v);
                }
            }
        });

        section.appendChild(blocform);
    }

    createBlocflex(blocform, key, v)
    {
        const blocflex = document.createElement('div');
        blocflex.setAttribute("class", 'blocflex');

        Object.entries(v).forEach(([key,v])=>{
            if(key.includes('sub-title')){
                this.createTitle(blocflex, v);
            } else {
                this.createColonne(blocflex, key, v);
            }
        });

        blocform.appendChild(blocflex);
    }

    createColonne(blocform, key, v)
    {
        const colonne = document.createElement('div');
        colonne.setAttribute("class", v.class);

        Object.entries(v).forEach(([key,v])=>{
            if(key.includes("sous-colonne")){
                this.createSousColonne(colonne, key, v);
            } else {
                this.createInput(colonne, key, v);
            }
        });

        blocform.appendChild(colonne);
    }

    createSousColonne(colonne, key, v)
    {
        const sousColonne = document.createElement('div');
        if(key.includes('droite')){
            sousColonne.setAttribute("class", 'deuxchamps droite');
        } else {
            sousColonne.setAttribute("class", 'deuxchamps');
        }

        Object.entries(v).forEach(([key,v])=>{
            this.createInput(sousColonne, key, v);
        });

        colonne.appendChild(sousColonne);
    }

    createInput(section, key, v)
    {
        console.log(v);
        if(v.type === "select"){
            this.createSelect(section, key, v);
        } else if(key !== 'class') {
            const input = document.createElement(v.balise);

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
            if( v.class ) { input.setAttribute("class", v.class); }
            if( v.text ) { input.innerText = v.text; }

            //TODO : traiter le cas d'un select ou des autre champs spécifiques

            section.appendChild(input);
        }
    }

    createSelect(section, key, v)
    {
        const select = document.createElement('select');
        const options = v.options;

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

        section.appendChild(select);
    }

    createText(section, v)
    {
        const sectionText = document.createElement(v.balise);
        sectionText.setAttribute("class", v.class);
        sectionText.innerText = v.text;
        section.appendChild(sectionText);
    }

    setupForm () {

        // TODO: mettre les bons champs que tu m'as envoyé

        return {
            'informations-demandeur': {
                'title': {
                    'title': ' Informations Demandeur',
                    'page1': 'active',
                    'page2': '',
                    'page3': '',
                    'id': 'cl_titre',
                    'class': 'informations-demandeur',
                    'notice': 'Ces champs sont indicatifs. L\'opérateur de classement vérifiera et/ou ajoutera les champs manquants lors de la visite d\'inspection.',
                    'balise': 'h2'
                },
                'content': {
                    'blocform': {
                        'blocflex': {
                            'colonne-gauche': {
                                'class': 'colonne colonne-gauche',
                                'sous-colonne-1': {
                                    'civilite': {
                                        'type': 'select',
                                        'required': 'required',
                                        'options': [
                                            {'value': "", 'label': 'Civilité'},
                                            {'value': 'Monsieur', 'label': 'Monsieur'},
                                            {'value': 'Monsieur et Madame', 'label': 'Monsieur et Madame'},
                                            {'value': 'Madame', 'label': 'Madame'},
                                            {'value': 'Mademoiselle', 'label': 'Mademoiselle'},
                                            {'value': 'ND', 'label': 'ND'},
                                        ],
                                        'id': 'civilite',
                                        'name': 'civilite',
                                        'class': 'form-control'
                                    },
                                    'raison': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'placeholder': 'Raison Sociale',
                                        'pattern': '^[a-zA-Z]{1,20}$',
                                        'id': 'raison',
                                        'name': 'raison',
                                        'class': 'form-control'
                                    },
                                    'nom': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'placeholder': 'Nom',
                                        'pattern': '^[a-zA-Z]{1,20}$',
                                        'id': 'nom',
                                        'name': 'nom',
                                        'class': 'form-control'
                                    },
                                    'prenom': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'placeholder': 'Prénom',
                                        'pattern': '^[a-zA-Z]{1,20}$',
                                        'id': 'prenom',
                                        'name': 'prenom',
                                        'class': 'form-control'
                                    },
                                },
                                'siret': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'placeholder': 'Ajouter un SIRET/SIREN (optionnel)',
                                    'pattern': '[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}',
                                    'id': 'siret',
                                    'name': 'siret',
                                    'class': 'form-control'
                                },
                                'sous-colonne-2': {
                                    'email': {
                                        'balise': 'input',
                                        'type': 'email',
                                        'required': 'required',
                                        'placeholder': 'Mail principal',
                                        'pattern': '[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}',
                                        'id': 'email',
                                        'name': 'email',
                                        'class': 'form-control'
                                    },
                                    'tel': {
                                        'balise': 'input',
                                        'type': 'tel',
                                        'required': 'required',
                                        'placeholder': 'Téléphone principal',
                                        'pattern': '^(?:(?:\\+|00)33[\\s.-]{0,3}(?:\\(0\\)[\\s.-]{0,3})?|0)[1-9](?:(?:[\\s.-]?\\d{2}){4}|\\d{2}(?:[\\s.-]?\\d{3}){2})$',
                                        'id': 'tel',
                                        'name': 'tel',
                                        'class': 'form-control'
                                    },
                                }
                            },
                            'colonne-droite': {
                                'class': 'colonne colonne-droite',
                                'adresse': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'required': 'required',
                                    'placeholder': 'Adresse',
                                    'id': 'adresse',
                                    'name': 'adresse',
                                    'class': 'form-control'
                                },
                                'complement-ad': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'placeholder': 'Complément d\'adresse',
                                    'id': 'complement-ad',
                                    'name': 'complement-ad',
                                    'class': 'form-control'
                                },
                                'sous-colonne-1': {
                                    'code-postal': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'required': 'required',
                                        'placeholder': 'Code postal',
                                        'pattern': '[0-9]{5}',
                                        'minlength': "5",
                                        'maxlength': "5",
                                        'id': 'code-postal',
                                        'name': 'code-postal',
                                        'class': 'form-control'
                                    },
                                    'pays': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'required': 'required',
                                        'placeholder': 'Pays',
                                        'id': 'pays',
                                        'name': 'pays',
                                        'class': 'form-control'
                                    },
                                },
                                'commune': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'required': 'required',
                                    'placeholder': 'Nom de la commune',
                                    'id': 'commune',
                                    'name': 'commune',
                                    'class': 'form-control'
                                },
                                'sous-colonne-droite': {
                                    'back': {
                                        'balise': 'button',
                                        'text': '< Retour',
                                        'class': 'back'
                                    },
                                    'next': {
                                        'balise': 'input',
                                        'type': 'submit',
                                        'value': '+ Passez à l\'étape 2',
                                        'class': 'next'
                                    }
                                }
                            },
                        },
                    },

                }
            },
            'informations-hebergement': {
                'title': {
                    'title': ' Informations Hébergement',
                    'page1': '',
                    'page2': 'active',
                    'page3': '',
                    'id': 'cl_titre',
                    'class': 'informations-hebergement',
                    'balise': 'h2'
                },
                'content': {
                    'not-proprietaire': {
                        'balise': 'button',
                        'text': '+ Le demandeur n\'est pas le propriétaire',
                        'class': 'not-proprietaire'
                    },
                    'blocform-1': {
                        'blocflex': {
                            'sub-title-1': {
                                'subTitle': ' Information du propriétaire',
                                'class': 'sub-title',
                                'balise': 'h3'
                            },
                            'colonne-gauche': {
                                'class': 'colonne colonne-gauche pt0',
                                'sous-colonne-1': {
                                    'civilite-hebergeur': {
                                        'type': 'select',
                                        'required': 'required',
                                        'options': [
                                            {'value': "", 'label': 'Civilité'},
                                            {'value': 'Monsieur', 'label': 'Monsieur'},
                                            {'value': 'Monsieur et Madame', 'label': 'Monsieur et Madame'},
                                            {'value': 'Madame', 'label': 'Madame'},
                                            {'value': 'Mademoiselle', 'label': 'Mademoiselle'},
                                            {'value': 'ND', 'label': 'ND'},
                                        ],
                                        'id': 'civilite-hebergeur',
                                        'name': 'civilite-hebergeur',
                                        'class': 'form-control'
                                    },
                                    'raison-hebergeur': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'placeholder': 'Raison Sociale',
                                        'pattern': '^[a-zA-Z]{1,20}$',
                                        'id': 'raison-hebergeur',
                                        'name': 'raison-hebergeur',
                                        'class': 'form-control'
                                    },
                                    'nom-hebergeur': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'placeholder': 'Nom',
                                        'pattern': '^[a-zA-Z]{1,20}$',
                                        'id': 'nom-hebergeur',
                                        'name': 'nom-hebergeur',
                                        'class': 'form-control'
                                    },
                                    'prenom-hebergeur': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'placeholder': 'Prénom',
                                        'pattern': '^[a-zA-Z]{1,20}$',
                                        'id': 'prenom-hebergeur',
                                        'name': 'prenom-hebergeur',
                                        'class': 'form-control'
                                    },
                                },
                                'siret-hebergeur': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'placeholder': 'Ajouter un SIRET/SIREN (optionnel)',
                                    'pattern': '[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}',
                                    'id': 'siret-hebergeur',
                                    'name': 'siret-hebergeur',
                                    'class': 'form-control'
                                },
                                'sous-colonne-2': {
                                    'email-hebergeur': {
                                        'balise': 'input',
                                        'type': 'email',
                                        'required': 'required',
                                        'placeholder': 'Mail principal',
                                        'pattern': '[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}',
                                        'id': 'email-hebergeur',
                                        'name': 'email-hebergeur',
                                        'class': 'form-control'
                                    },
                                    'tel-hebergeur': {
                                        'balise': 'input',
                                        'type': 'tel',
                                        'required': 'required',
                                        'placeholder': 'Téléphone principal',
                                        'pattern': '^(?:(?:\\+|00)33[\\s.-]{0,3}(?:\\(0\\)[\\s.-]{0,3})?|0)[1-9](?:(?:[\\s.-]?\\d{2}){4}|\\d{2}(?:[\\s.-]?\\d{3}){2})$',
                                        'id': 'tel-hebergeur',
                                        'name': 'tel-hebergeur',
                                        'class': 'form-control'
                                    },
                                }
                            },
                            'colonne-droite': {
                                'class': 'colonne colonne-droite pt0',
                                'adresse-hebergeur': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'required': 'required',
                                    'placeholder': 'Adresse',
                                    'id': 'adresse-hebergeur',
                                    'name': 'adresse-hebergeur',
                                    'class': 'form-control'
                                },
                                'complement-ad': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'placeholder': 'Complément d\'adresse',
                                    'id': 'complement-ad',
                                    'name': 'complement-ad',
                                    'class': 'form-control'
                                },
                                'sous-colonne-1': {
                                    'code-postal-hebergeur': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'required': 'required',
                                        'placeholder': 'Code postal',
                                        'pattern': '[0-9]{5}',
                                        'minlength': "5",
                                        'maxlength': "5",
                                        'id': 'code-postal-hebergeur',
                                        'name': 'code-postal-hebergeur',
                                        'class': 'form-control'
                                    },
                                    'pays-hebergeur': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'required': 'required',
                                        'placeholder': 'Pays',
                                        'id': 'pays-hebergeur',
                                        'name': 'pays-hebergeur',
                                        'class': 'form-control'
                                    },
                                },
                                'commune-hebergeur': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'required': 'required',
                                    'placeholder': 'Nom de la commune',
                                    'id': 'commune-hebergeur',
                                    'name': 'commune-hebergeur',
                                    'class': 'form-control'
                                }
                            },
                        },
                    },
                    'blocform-2': {
                        'blocflex-1': {
                            'sub-title-1': {
                                'subTitle': ' Information de l\'hébergement',
                                'class': 'sub-title',
                                'balise': 'h3'
                            },
                            'colonne-gauche': {
                                'class': 'colonne colonne-gauche pt0 pb0',
                                'nom-hebergement': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'placeholder': 'Nom',
                                    'pattern': '^[a-zA-Z]{1,20}$',
                                    'id': 'nom-hebergement',
                                    'name': 'nom-hebergement',
                                    'class': 'form-control'
                                },
                                'sous-colonne-1': {
                                    'adresse-hebergement': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'required': 'required',
                                        'placeholder': 'Adresse',
                                        'id': 'adresse-hebergement',
                                        'name': 'adresse-hebergement',
                                        'class': 'form-control'
                                    },
                                    'complement-ad': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'placeholder': 'Complément d\'adresse',
                                        'id': 'complement-ad-hebergement',
                                        'name': 'complement-ad-hebergement',
                                        'class': 'form-control'
                                    },
                                }
                            },
                            'colonne-droite': {
                                'class': 'colonne colonne-droite pt0 pb0',
                                'sous-colonne-1': {
                                    'departement-hebergement': {
                                        'type': 'select',
                                        'required': 'required',
                                        'options': [
                                            {'value': "", 'label': 'Département'},
                                            {'value': '1', 'label': '1'},
                                            {'value': '2', 'label': '2'},
                                            {'value': '3', 'label': '3'}
                                        ],
                                        'id': 'departement-hebergement',
                                        'name': 'departement-hebergement',
                                        'class': 'form-control'
                                    },
                                    'commune-hebergement': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'required': 'required',
                                        'placeholder': 'Nom de la commune',
                                        'id': 'commune-hebergement',
                                        'name': 'commune-hebergement',
                                        'class': 'form-control'
                                    }
                                },
                                'sous-colonne-2': {
                                    'tel-hebergement': {
                                        'balise': 'input',
                                        'type': 'tel',
                                        'required': 'required',
                                        'placeholder': 'Téléphone',
                                        'pattern': '^(?:(?:\\+|00)33[\\s.-]{0,3}(?:\\(0\\)[\\s.-]{0,3})?|0)[1-9](?:(?:[\\s.-]?\\d{2}){4}|\\d{2}(?:[\\s.-]?\\d{3}){2})$',
                                        'id': 'tel-hebergeur',
                                        'name': 'tel-hebergeur',
                                        'class': 'form-control'
                                    },
                                    'etage-hebergement': {
                                        'type': 'select',
                                        'required': 'required',
                                        'options': [
                                            {'value': "", 'label': 'Étage'},
                                            {'value': '0', 'label': 'RDC / RDJ'},
                                            {'value': '1', 'label': '1'},
                                            {'value': '2', 'label': '2'},
                                            {'value': '3', 'label': '3'},
                                            {'value': '4', 'label': '4 et plus'}
                                        ],
                                        'id': 'etage-hebergement',
                                        'name': 'etage-hebergement',
                                        'class': 'form-control'
                                    },
                                },
                            },
                        },
                        'blocflex-2': {
                            'sub-title-1': {
                                'subTitle': ' Identification de l\'hébergement',
                                'class': 'sub-title',
                                'balise': 'h3'
                            },
                            'colonne-gauche': {
                                'class': 'colonne colonne-gauche pt0',
                                'type-hebergement': {
                                    'type': 'select',
                                    'required': 'required',
                                    'options': [
                                        {'value': "", 'label': 'Type de logement du meublé'},
                                        {'value': 'appartement', 'label': 'Appartement'},
                                        {'value': 'appartement-studio', 'label': 'Appartement studio'},
                                        {'value': 'studio', 'label': 'Studio'},
                                        {'value': 'studio-mezzanine', 'label': 'Studio mezzanine'},
                                        {'value': 'villa', 'label': 'Villa'},
                                        {'value': 'chalet', 'label': 'Chalet'},
                                        {'value': 'demi-chalet', 'label': '1/2 Chalet'},
                                        {'value': 'ferme', 'label': 'Ferme'},
                                        {'value': 'maison', 'label': 'Maison'},
                                        {'value': 'studio-cabine', 'label': 'Studio cabine'},
                                        {'value': 'chambre', 'label': 'Chambre'},
                                        {'value': 'autre', 'label': 'Autre'}
                                    ],
                                    'id': 'type-hebergement',
                                    'name': 'type-hebergement',
                                    'class': 'form-control'
                                },
                                'capacite-hebergement': {
                                    'balise': 'input',
                                    'type': 'number',
                                    'required': 'required',
                                    'placeholder': 'Capacité classée demandée',
                                    'id': 'capacite-hebergement',
                                    'name': 'capacite-hebergement',
                                    'class': 'form-control'
                                },
                                'nbpieces-hebergement': {
                                    'balise': 'input',
                                    'type': 'number',
                                    'required': 'required',
                                    'placeholder': 'Nombre de pièces composant le meublé',
                                    'id': 'nbpieces-hebergement',
                                    'name': 'nbpieces-hebergement',
                                    'class': 'form-control'
                                },
                                'nbchambre-hebergement': {
                                    'balise': 'input',
                                    'type': 'number',
                                    'required': 'required',
                                    'placeholder': 'Nombre de chambre(s)/cabine(s)',
                                    'id': 'nbchambre-hebergement',
                                    'name': 'nbchambre-hebergement',
                                    'class': 'form-control'
                                }
                            },
                            'colonne-droite': {
                                'class': 'colonne colonne-droite pt0',
                                'classement-hebergement': {
                                    'type': 'select',
                                    'required': 'required',
                                    'options': [
                                        {'value': "", 'label': 'Classement actuel'},
                                        {'value': 'non-classe', 'label': 'Non-classé'},
                                        {'value': '1etoile', 'label': '1 ★'},
                                        {'value': '2etoiles', 'label': '2 ★'},
                                        {'value': '3etoiles', 'label': '3 ★'},
                                        {'value': '4etoiles', 'label': '4 ★'},
                                        {'value': '5etoiles', 'label': '5 ★'},
                                        {'value': 'noloso', 'label': 'Ne sait pas'},
                                    ],
                                    'id': 'classement-hebergement',
                                    'name': 'classement-hebergement',
                                    'class': 'form-control'
                                },
                                'surface-hebergement': {
                                    'balise': 'input',
                                    'type': 'number',
                                    'step': 0.01,
                                    'required': 'required',
                                    'placeholder': 'Surface totale',
                                    'id': 'surface-hebergement',
                                    'name': 'surface-hebergement',
                                    'class': 'form-control'
                                },
                                'surface-ss-sdb-hebergement': {
                                    'balise': 'input',
                                    'type': 'number',
                                    'step': 0.01,
                                    'required': 'required',
                                    'placeholder': 'Surface hors salle de bain et WC',
                                    'id': 'surface-ss-sdb-hebergement',
                                    'name': 'surface-ss-sdb-hebergement',
                                    'class': 'form-control'
                                },
                                'sous-colonne-droite': {
                                    'back': {
                                        'balise': 'button',
                                        'text': '< Retour à l\'étape 1',
                                        'class': 'back'
                                    },
                                    'next': {
                                        'balise': 'input',
                                        'type': 'submit',
                                        'value': '+ Finaliser',
                                        'class': 'next'
                                    }
                                }
                            },
                        },
                    }
                }
            },
            'tarif-prestation': {
                'title': {
                    'title': ' Tarif prestation',
                    'page1': '',
                    'page2': '',
                    'page3': 'active',
                    'id': 'cl_titre',
                    'class': 'tarif-prestation',
                    'balise': 'h2'
                },
                'content': {
                    'blocform': {
                        'sub-title': {
                            'subTitle': ' Tarif de la prestation',
                            'class': 'sub-title',
                            'balise': 'h4'
                        },
                        'text': {
                            'text': '150 €',
                            'class': 'tarif',
                            'balise': 'p'
                        },
                        'next': {
                            'balise': 'input',
                            'type': 'submit',
                            'value': '+ Valider la demande',
                            'class': 'valid'
                        },
                        'back': {
                            'balise': 'button',
                            'text': '< Retour à l\'étape 2',
                            'class': 'back'
                        }
                    },

                }
            },
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
            "request": {
                "eligDemandee": 3,
                "capClassee": 10,
                "nbPiecesSupp": 12, /* nbPiecesTot - 1 */
            },
            "accommodation": {
                "name": "NT",
                "floor": 1,
                "type": "Studio",
                "address": "36 rue Maille",
                "city": "Marseille",
                "surface": 80.3,
                "surfaceHsdb": 76.2,
                "nbPersonsClasse": 10,
                "nbPiecesTot": 13,
                "currentRanking": 2,
                "owner": {
                    "civility": "Monsieur",
                    "firstName": "Julien",
                    "lastName": "Dignat",
                    "mail": "juliend@nouveauxterritoires.fr",
                    "phone": "09 78 63 04 29",
                    "phone2": "06 98 07 82 20",
                    "buisinessName": null,
                    "address": "55 Bd Cabassud",
                    "postalCode": 13010,
                    "city": "Marseille",
                    "country": "France"
                },
                "applicant": { /* Concerne la partie "Mandataire", si cette partie est vide => 'applicant':{}, */
                    "civility": null,
                    "firstName": null,
                    "lastName": null,
                    "mail": "support@nouveauxterritoires.fr",
                    "phone": "09 78 63 04 29",
                    "buisinessName": "Nouveaux Territoires",
                    "address": "33 rue Julia",
                    "postalCode": "13005",
                    "city": "Marseille",
                    "country": "France"
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


