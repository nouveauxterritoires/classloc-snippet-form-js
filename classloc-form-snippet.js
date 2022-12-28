
/*jshint esversion: 6 */

// TODO: Ajouter un peu de styles au formulaire

class ClasslocFormulaire
{
    constructor( id )
    {

        this.urlApi = "https://classloc.dev.local/api/v1/create_outsider_demand";
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
            this.sendForm();
        });

        document.getElementById(id).appendChild(form);

    }

    getToken() {
        return document.getElementById("classloc-form").getAttribute('data-cltoken');
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

        title.innerHTML = v.title +
            "<div class='pagination'>" +
            "<span class='"+v.page1+"'>1</span>" +
            "<span class='"+v.page2+"'>2</span>" +
            "<span class='"+v.page3+"'>✓</span>" +
            "</div>"
        ;

        section.appendChild(title);
    }

    createSubTitle(section, v)
    {
        console.log(v);
        const subTitle = document.createElement(v.balise);
        subTitle.setAttribute("class", v.class);
        subTitle.innerHTML = v.subTitle;

        const divSubTitle = document.createElement('div');
        divSubTitle.setAttribute("class", "colonne subtitle");
        divSubTitle.appendChild(subTitle);

        section.appendChild(divSubTitle);
    }

    createSection(form, value)
    {
        const section = document.createElement('section');
        section.setAttribute("class", value.title.class);
        section.setAttribute("id", value.title.id);
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
                    this.createSubTitle(blocform, v);
                } else if(key.includes('text')) {
                    this.createText(blocform, v);
                } else {
                    if(v.balise === "a"){
                        this.createHref(blocform, key, v);
                    } else {
                        this.createInput(blocform, key, v);
                    }
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
                this.createSubTitle(blocflex, v);
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
            console.log('before createInput');
            if (v.balise === "a"){
                this.createHref(sousColonne, key, v);
            } else {
                this.createInput(sousColonne, key, v);
            }
        });

        colonne.appendChild(sousColonne);
    }

    createHref(section, key, v)
    {
        const a = document.createElement(v.balise);

        a.setAttribute("id", key);
        if( v.href ) { a.setAttribute("href", v.href); }
        if( v.class ) { a.setAttribute("class", v.class); }
        if( v.id ) { a.setAttribute("id", v.id); }
        if( v.text ) { a.innerText = v.text; }

        section.appendChild(a);
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
            // if( v.required ) { input.setAttribute("required", v.required); }
            // if( v.pattern ) { input.setAttribute("pattern", v.pattern); }
            if( v.min ) { input.setAttribute("min", v.min); }
            if( v.max ) { input.setAttribute("max", v.max); }
            if( v.step ) { input.setAttribute("step", v.step); }
            if( v.class ) { input.setAttribute("class", v.class); }
            if( v.text ) { input.innerText = v.text; }

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
        sectionText.setAttribute("id", v.id);
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
                    'id': 'informations-demandeur',
                    'class': 'cl_titre tab-active',
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
                                    'next': {
                                        'balise': 'a',
                                        'href': '#informations-hebergement',
                                        'text': '+ Passez à l\'étape 2',
                                        'class': 'next',
                                        'id': 'next-to-step-2'
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
                    'id': 'informations-hebergement',
                    'class': 'cl_titre',
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
                                'class': 'sub-title sub-title-1',
                                'balise': 'h3'
                            },
                            'colonne-gauche': {
                                'class': 'colonne colonne-gauche pt0',
                                'sous-colonne-1': {
                                    'civilite-hebergeur': {
                                        'type': 'select',
                                        'required': '',
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
                                        'required': '',
                                        'placeholder': 'Mail principal',
                                        'pattern': '[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,15}',
                                        'id': 'email-hebergeur',
                                        'name': 'email-hebergeur',
                                        'class': 'form-control'
                                    },
                                    'tel-hebergeur': {
                                        'balise': 'input',
                                        'type': 'tel',
                                        'required': '',
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
                                    'required': '',
                                    'placeholder': 'Adresse',
                                    'id': 'adresse-hebergeur',
                                    'name': 'adresse-hebergeur',
                                    'class': 'form-control'
                                },
                                'complement-ad-hebergeur': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'placeholder': 'Complément d\'adresse',
                                    'id': 'complement-ad-hebergeur',
                                    'name': 'complement-ad-hebergeur',
                                    'class': 'form-control'
                                },
                                'sous-colonne-1': {
                                    'code-postal-hebergeur': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'required': '',
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
                                        'required': '',
                                        'placeholder': 'Pays',
                                        'id': 'pays-hebergeur',
                                        'name': 'pays-hebergeur',
                                        'class': 'form-control'
                                    },
                                },
                                'commune-hebergeur': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'required': '',
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
                                'class': 'sub-title sub-title-2',
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
                                    'complement-ad-hebergement': {
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
                                            {'value': '01', 'label': '01 - Ain'},
                                            {'value': '02', 'label': '02 - Aisne'},
                                            {'value': '03', 'label': '03 - Allier'},
                                            {'value': '04', 'label': '04 - Alpes de Haute-Provence'},
                                            {'value': '05', 'label': '05 - Hautes-Alpes'},
                                            {'value': '06', 'label': '06 - Alpes-Maritimes'},
                                            {'value': '07', 'label': '07 - Ardêche'},
                                            {'value': '08', 'label': '08 - Ardennes'},
                                            {'value': '09', 'label': '09 - Ariège'},
                                            {'value': '10', 'label': '10 - Aube'},
                                            {'value': '11', 'label': '11 - Aude'},
                                            {'value': '12', 'label': '12 - Aveyron'},
                                            {'value': '13', 'label': '13 - Bouches-du-Rhône'},
                                            {'value': '14', 'label': '14 - Calvados'},
                                            {'value': '15', 'label': '15 - Cantal'},
                                            {'value': '16', 'label': '16 - Charente'},
                                            {'value': '17', 'label': '17 - Charente-Maritime'},
                                            {'value': '18', 'label': '18 - Cher'},
                                            {'value': '19', 'label': '19 - Corrèze'},
                                            {'value': '2A', 'label': '2A - Corse-du-Sud'},
                                            {'value': '2B', 'label': '2B - Haute-Corse'},
                                            {'value': '21', 'label': '21 - Côte-d\'Or'},
                                            {'value': '22', 'label': '22 - Côtes d\'Armor'},
                                            {'value': '23', 'label': '23 - Creuse'},
                                            {'value': '24', 'label': '24 - Dordogne'},
                                            {'value': '25', 'label': '25 - Doubs'},
                                            {'value': '26', 'label': '26 - Drôme'},
                                            {'value': '27', 'label': '27 - Eure'},
                                            {'value': '28', 'label': '28 - Eure-et-Loir'},
                                            {'value': '29', 'label': '29 - Finistère'},
                                            {'value': '30', 'label': '30 - Gard'},
                                            {'value': '31', 'label': '31 - Haute-Garonne'},
                                            {'value': '32', 'label': '32 - Gers'},
                                            {'value': '33', 'label': '33 - Gironde'},
                                            {'value': '34', 'label': '34 - Hérault'},
                                            {'value': '35', 'label': '35 - Île-et-Vilaine'},
                                            {'value': '36', 'label': '36 - Indre'},
                                            {'value': '37', 'label': '37 - Indre-et-Loire'},
                                            {'value': '38', 'label': '38 - Isère'},
                                            {'value': '39', 'label': '39 - Jura'},
                                            {'value': '40', 'label': '40 - Landes'},
                                            {'value': '41', 'label': '41 - Loir-et-Cher'},
                                            {'value': '42', 'label': '42 - Loire'},
                                            {'value': '43', 'label': '43 - Haute-Loire'},
                                            {'value': '44', 'label': '44 - Loire-Atlantique'},
                                            {'value': '45', 'label': '45 - Loiret'},
                                            {'value': '46', 'label': '46 - Lot'},
                                            {'value': '47', 'label': '47 - Lot-et-Garonne'},
                                            {'value': '48', 'label': '48 - Lozère'},
                                            {'value': '49', 'label': '49 - Maine-et-Loire'},
                                            {'value': '50', 'label': '50 - Manche'},
                                            {'value': '51', 'label': '51 - Marne'},
                                            {'value': '52', 'label': '52 - Haute-Marne'},
                                            {'value': '53', 'label': '53 - Mayenne'},
                                            {'value': '54', 'label': '54 - Meurthe-et-Moselle'},
                                            {'value': '55', 'label': '55 - Meuse'},
                                            {'value': '56', 'label': '56 - Morbihan'},
                                            {'value': '57', 'label': '57 - Moselle'},
                                            {'value': '58', 'label': '58 - Nièvre'},
                                            {'value': '59', 'label': '59 - Nord'},
                                            {'value': '60', 'label': '60 - Oise'},
                                            {'value': '61', 'label': '61 - Orne'},
                                            {'value': '62', 'label': '62 - Pas-de-Calais'},
                                            {'value': '63', 'label': '63 - Puy-de-Dôme'},
                                            {'value': '64', 'label': '64 - Pyrénées-Atlantiques'},
                                            {'value': '65', 'label': '65 - Hautes-Pyrénées'},
                                            {'value': '66', 'label': '66 - Pyrénées-Orientales'},
                                            {'value': '67', 'label': '67 - Bas-Rhin'},
                                            {'value': '68', 'label': '68 - Haut-Rhin'},
                                            {'value': '69', 'label': '69 - Rhône'},
                                            {'value': '70', 'label': '70 - Haute-Saône'},
                                            {'value': '71', 'label': '71 - Saône-et-Loire'},
                                            {'value': '72', 'label': '72 - Sarthe'},
                                            {'value': '73', 'label': '73 - Savoie'},
                                            {'value': '74', 'label': '74 - Haute-Savoie'},
                                            {'value': '75', 'label': '75 - Paris'},
                                            {'value': '76', 'label': '76 - Seine-Maritime'},
                                            {'value': '77', 'label': '77 - Seine-et-Marne'},
                                            {'value': '78', 'label': '78 - Yvelines'},
                                            {'value': '79', 'label': '79 - Deux-Sèvres'},
                                            {'value': '80', 'label': '80 - Somme'},
                                            {'value': '81', 'label': '81 - Tarn'},
                                            {'value': '82', 'label': '82 - Tarn-et-Garonne'},
                                            {'value': '83', 'label': '83 - Var'},
                                            {'value': '84', 'label': '84 - Vaucluse'},
                                            {'value': '85', 'label': '85 - Vendée'},
                                            {'value': '86', 'label': '86 - Vienne'},
                                            {'value': '87', 'label': '87 - Haute-Vienne'},
                                            {'value': '88', 'label': '88 - Vosges'},
                                            {'value': '89', 'label': '89 - Yonne'},
                                            {'value': '90', 'label': '90 - Territoire-de-Belfort'},
                                            {'value': '91', 'label': '91 - Essonne'},
                                            {'value': '92', 'label': '92 - Hauts-de-Seine'},
                                            {'value': '93', 'label': '93 - Seine-Saint-Denis'},
                                            {'value': '94', 'label': '94 - Val-de-Marne'},
                                            {'value': '95', 'label': '95 - Val-d\'Oise'}
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
                                'class': 'sub-title sub-title-3',
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
                                        {'value': '1', 'label': '1 ★'},
                                        {'value': '2', 'label': '2 ★'},
                                        {'value': '3', 'label': '3 ★'},
                                        {'value': '4', 'label': '4 ★'},
                                        {'value': '5', 'label': '5 ★'},
                                        {'value': '0', 'label': 'Ne sait pas'},
                                    ],
                                    'id': 'classement-hebergement',
                                    'name': 'classement-hebergement',
                                    'class': 'form-control'
                                },
                                'eligibilite-demandee': {
                                    'type': 'select',
                                    'required': 'required',
                                    'options': [
                                        {'value': "", 'label': 'Éligibilité demandée'},
                                        {'value': '1', 'label': '1 ★'},
                                        {'value': '2', 'label': '2 ★'},
                                        {'value': '3', 'label': '3 ★'},
                                        {'value': '4', 'label': '4 ★'},
                                        {'value': '5', 'label': '5 ★'},
                                        {'value': '0', 'label': 'Ne sait pas'},
                                    ],
                                    'id': 'eligibilite-demandee',
                                    'name': 'eligibilite-demandee',
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
                                        'balise': 'a',
                                        'href': '#informations-demandeur',
                                        'text': '< Retour à l\'étape 1',
                                        'class': 'back',
                                        'id': 'back-to-step-1'
                                    },
                                    'next': {
                                        'balise': 'a',
                                        'href': '#tarif-prestation',
                                        'text': '+ Finaliser',
                                        'class': 'next',
                                        'id': 'next-to-step-3'
                                    }
                                }
                            },
                        },
                    }
                }
            },
            'tarif-prestation': {
                'title': {
                    // 'title': ' Tarif prestation',
                    'title': ' Valider la demande',
                    'page1': '',
                    'page2': '',
                    'page3': 'active',
                    'id': 'tarif-prestation',
                    'class': 'cl_titre',
                    'balise': 'h2'
                },
                'content': {
                    'blocform': {
                        'sub-title': {
                            // 'subTitle': ' Tarif de la prestation',
                            'subTitle': ' ',
                            'class': 'sub-title',
                            'balise': 'h4'
                        },
                        // 'text': {
                        //     'text': '150 €',
                        //     'class': 'tarif',
                        //     'id': 'tarif',
                        //     'balise': 'p'
                        // },
                        'back': {
                            'balise': 'a',
                            'href': '#informations-hebergement',
                            'text': '< Retour à l\'étape 2',
                            'class': 'back',
                            'id': 'back-to-step-2'
                        },
                        'next': {
                            'balise': 'input',
                            'type': 'submit',
                            'value': '+ Valider la demande',
                            'class': 'valid'
                        }
                    }

                }
            }
        };
    }

    validate () {

    }

    sendForm () {
        var data = {
            "data" : {
                "request": {
                    "source": "snippet-form",
                    "eligDemandee": document.getElementById("eligibilite-demandee").value,
                    "capClassee": document.getElementById('capacite-hebergement').value,
                    "nbPiecesSupp": document.getElementById('nbpieces-hebergement').value - 1, /* nbPiecesTot - 1 */
                },
                "accommodation": {
                    "name": document.getElementById("nom-hebergement").value,
                    "floor": document.getElementById("etage-hebergement").value,
                    "subtype": document.getElementById("type-hebergement").value,
                    "phone": document.getElementById("tel-hebergement").value,
                    "address": document.getElementById("adresse-hebergement").value,
                    "additionnalAddress": document.getElementById("complement-ad-hebergement").value,
                    "departement": document.getElementById("departement-hebergement").value,
                    "city": document.getElementById("commune-hebergement").value,
                    "surface": document.getElementById("surface-hebergement").value,
                    "surfaceHsdb": document.getElementById("surface-ss-sdb-hebergement").value,
                    "nbPersonsClasse": document.getElementById("capacite-hebergement").value,
                    "nbCabine": document.getElementById("nbchambre-hebergement").value,
                    "nbPiecesTot": document.getElementById("nbpieces-hebergement").value,
                    "currentRanking": document.getElementById("classement-hebergement").value,
                    "owner": {
                        "civility": document.getElementById("civilite-hebergeur").value,
                        "buisinessName": document.getElementById("raison-hebergeur").value,
                        "firstName": document.getElementById("nom-hebergeur").value,
                        "lastName": document.getElementById("prenom-hebergeur").value,
                        "siret": document.getElementById("siret-hebergeur").value,
                        "mail": document.getElementById("email-hebergeur").value,
                        "phone": document.getElementById("tel-hebergeur").value,
                        "address": document.getElementById("adresse-hebergeur").value,
                        "additionnalAddress": document.getElementById("complement-ad").value,
                        "postalCode": document.getElementById("code-postal-hebergeur").value,
                        "city": document.getElementById("commune-hebergeur").value,
                        "country": document.getElementById("pays-hebergeur").value
                    },
                    "applicant": {
                        "civility": document.getElementById("civilite").value,
                        "buisinessName": document.getElementById("raison").value,
                        "firstName": document.getElementById("nom").value,
                        "lastName": document.getElementById("prenom").value,
                        "siret": document.getElementById("siret").value,
                        "mail": document.getElementById("email").value,
                        "phone": document.getElementById("tel").value,
                        "address": document.getElementById("adresse").value,
                        "additionnalAddress": document.getElementById("complement-ad-hebergeur").value,
                        "postalCode": document.getElementById("code-postal").value,
                        "city": document.getElementById("commune").value,
                        "country": document.getElementById("pays").value
                    }
                }
            }
        };

        fetch(this.urlApi, {
            method: 'post',
            headers: new Headers({
                // 'Authorization': 'Bearer ' + this.getToken(),
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(data)
        }).then(function (response) {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then(function (data) {
            console.log(data);
        }).catch(function (error) {
            console.warn('Something went wrong.', error);
        });
    }

    onSendFormSuccess (event) {
        // TODO : Masquer le formulaire et afficher un message de succès dans le bloc notice
        console.log("Success !");
        console.log(event.target.responseText);
    }

    onSendFormError (event) {
        // TODO : Ajouter l'erreur au bloc notice prévu à cet effet
        console.log("Une erreur s'est produite : ");
        console.log(event.target.responseText);
    }
}

const form = new ClasslocFormulaire("classloc-form");

window.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) => {
        if (!e.target) return;

        e.preventDefault();
        const section = e.target.closest('section');

        if( e.target.classList.contains('back') ) { // Mettre la classe prev ou remplacer celle là par celle dans les boutons precedent)
            section.classList.remove("tab-active");
            section.previousSibling.classList.add("tab-active");
        }
        else if( e.target.classList.contains('next') ) { // Mettre la classe next ou remplacer celle là par celle dans les boutons suivant)
            section.classList.remove("tab-active");
            section.nextSibling.classList.add("tab-active");
        }
    });
});