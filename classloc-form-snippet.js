
/*jshint esversion: 6 */

// TODO: Ajouter un peu de styles au formulaire

class ClasslocFormulaire
{
    constructor( id )
    {
        this.urlApi = "https://www.classloc.fr/api/v1/create_outsider_demand";
        this.config = this.setupForm();

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
        const notice = document.createElement('p');
        notice.innerText = v.notice;
        section.appendChild(notice);
    }

    createSendButton(form)
    {
        const divSubmit = document.createElement('div');
        divSubmit.setAttribute("class", "div-submit");

        const divAlert = document.createElement('div');
        divAlert.setAttribute("id", "div-alert");
        divSubmit.appendChild(divAlert);

        const button = document.createElement('input');
        button.type = 'submit';
        button.setAttribute("class", "valid");
        button.setAttribute("value", "Valider la demande");
        divSubmit.appendChild(button);

        form.appendChild(divSubmit);
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
        if(!value.submit){
            const section = document.createElement('section');
            section.setAttribute("class", value.title.class);
            section.setAttribute("id", value.title.id);
            this.createTitle(section, value.title);
            if(value.title.notice){
                this.createNoticeSection(section, value.title);
            }

            const sectionContainer = document.createElement('div');

            Object.entries(value.content).forEach(([key,v])=>{
                if(key === 'not-proprietaire' || key === 'information'){
                    this.createInput(sectionContainer, key, v);
                } else {
                    this.createBlocform(sectionContainer, key, v);
                }
            });

            section.appendChild(sectionContainer);
            form.appendChild(section);
        }
    }

    createBlocform(section, key, v)
    {
        const blocform = document.createElement('div');
        blocform.setAttribute("class", 'blocform');

        Object.entries(v).forEach(([key,v])=>{
            if(key.includes('sub-title')) {
                this.createSubTitle(blocform, v);
            } else if(key.includes('blocflex')) {
                this.createBlocflex(blocform, key, v);
            } else {
                 if(key.includes('text')) {
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
        if( v.style ) { blocform.setAttribute("style", v.style); }

        section.appendChild(blocform);
    }

    createBlocflex(blocform, key, v)
    {
        const blocflex = document.createElement('div');
        blocflex.setAttribute("class", 'blocflex');

        Object.entries(v).forEach(([key,v])=>{
            if(key.includes('sub-title')){
                // console.log('createBlocflex');
                // this.createSubTitle(blocflex, v);
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
        if(v.type === "select"){
            this.createSelect(section, key, v);
        } else if(key !== 'class') {
            const input = document.createElement(v.balise);

            input.setAttribute("id", key);
            if( v.type ) { input.setAttribute("type", v.type); }
            if( v.name ) { input.setAttribute("name", v.name); }
            if( v.placeholder ) { input.setAttribute("placeholder", v.placeholder); }
            if( v.onkeydown ) { input.setAttribute("onkeydown", v.onkeydown); }
            if( v.value ) { input.setAttribute("value", v.value); }
            if( v.required ) { input.setAttribute("required", v.required); }
            if( v.pattern ) { input.setAttribute("pattern", v.pattern); }
            if( v.min >= 0 ) { input.setAttribute("min", v.min); }
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
            if ( option.selected ) {
                opt.selected = option.selected;
            }
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
                                            {'value': "", 'label': 'Civilité*'},
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
                                        // 'pattern': '^[a-zA-Z ]{1,20}$',
                                        'id': 'raison',
                                        'name': 'raison',
                                        'class': 'form-control'
                                    },
                                    'nom': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'placeholder': 'Nom',
                                        // 'pattern': '^[a-zA-Z ]{1,20}$',
                                        'id': 'nom',
                                        'name': 'nom',
                                        'class': 'form-control'
                                    },
                                    'prenom': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'placeholder': 'Prénom',
                                        // 'pattern': '^[a-zA-Z ]{1,20}$',
                                        'id': 'prenom',
                                        'name': 'prenom',
                                        'class': 'form-control'
                                    },
                                },
                                'siret': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'placeholder': 'Ajouter un SIRET/SIREN (optionnel)',
                                    // 'pattern': '^[a-zA-Z]{1,20}$',
                                    'id': 'siret',
                                    'name': 'siret',
                                    'class': 'form-control'
                                },
                                'sous-colonne-2': {
                                    'email': {
                                        'balise': 'input',
                                        'type': 'email',
                                        'required': 'required',
                                        'placeholder': 'Mail principal*',
                                        'pattern': '[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,50}',
                                        'id': 'email',
                                        'name': 'email',
                                        'class': 'form-control'
                                    },
                                    'tel': {
                                        'balise': 'input',
                                        'type': 'tel',
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
                                    'placeholder': 'Adresse*',
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
                                        'placeholder': 'Code postal*',
                                        // 'pattern': '[0-9]{5}',
                                        'minlength': "5",
                                        'maxlength': "5",
                                        'id': 'code-postal',
                                        'name': 'code-postal',
                                        'class': 'form-control'
                                    },
                                    'pays': {
                                        'type': 'select',
                                        'required': 'required',
                                        'placeholder': 'Pays*',
                                        'id': 'pays',
                                        'name': 'pays',
                                        'class': 'form-control',
                                        'options': [
                                            {'value': "", 'label': 'Pays*'},
                                            {'value': "AFGHANISTAN", 'label': 'AFGHANISTAN'},
                                            {'value': 'AFRIQUE DU SUD', 'label': 'AFRIQUE DU SUD'},
                                            {'value': 'ALBANIE', 'label': 'ALBANIE'},
                                            {'value': 'ALGERIE', 'label': 'ALGERIE'},
                                            {'value': 'ALLEMAGNE', 'label': 'ALLEMAGNE'},
                                            {'value': 'ANDORRE', 'label': 'ANDORRE'},
                                            {'value': 'ANGOLA', 'label': 'ANGOLA'},
                                            {'value': 'ANTIGUA-ET-BARBUDA', 'label': 'ANTIGUA-ET-BARBUDA'},
                                            {'value': 'ARABIE SAOUDITE', 'label': 'ARABIE SAOUDITE'},
                                            {'value': 'ARGENTINE', 'label': 'ARGENTINE'},
                                            {'value': 'ARMENIE', 'label': 'ARMENIE'},
                                            {'value': 'AUSTRALIE', 'label': 'AUSTRALIE'},
                                            {'value': 'AUTRICHE', 'label': 'AUTRICHE'},
                                            {'value': 'AZERBAIDJAN', 'label': 'AZERBAIDJAN'},
                                            {'value': 'BAHAMAS', 'label': 'BAHAMAS'},
                                            {'value': 'BAHREIN', 'label': 'BAHREIN'},
                                            {'value': 'BANGLADESH', 'label': 'BANGLADESH'},
                                            {'value': 'BARBADE', 'label': 'BARBADE'},
                                            {'value': 'BELGIQUE', 'label': 'BELGIQUE'},
                                            {'value': 'BELIZE', 'label': 'BELIZE'},
                                            {'value': 'BENIN', 'label': 'BENIN'},
                                            {'value': 'BHOUTAN', 'label': 'BHOUTAN'},
                                            {'value': 'BIELORUSSIE', 'label': 'BIELORUSSIE'},
                                            {'value': 'BIRMANIE', 'label': 'BIRMANIE'},
                                            {'value': 'BOLIVIE', 'label': 'BOLIVIE'},
                                            {'value': 'BONAIRE, SAINT EUSTACHE ET SABA', 'label': 'BONAIRE, SAINT EUSTACHE ET SABA'},
                                            {'value': 'BOSNIE-HERZEGOVINE', 'label': 'BOSNIE-HERZEGOVINE'},
                                            {'value': 'BOTSWANA', 'label': 'BOTSWANA'},
                                            {'value': 'BRESIL', 'label': 'BRESIL'},
                                            {'value': 'BRUNEI', 'label': 'BRUNEI'},
                                            {'value': 'BULGARIE', 'label': 'BULGARIE'},
                                            {'value': 'BURKINA', 'label': 'BURKINA'},
                                            {'value': 'BURUNDI', 'label': 'BURUNDI'},
                                            {'value': 'CAMBODGE', 'label': 'CAMBODGE'},
                                            {'value': 'CAMEROUN', 'label': 'CAMEROUN'},
                                            {'value': 'CANADA', 'label': 'CANADA'},
                                            {'value': 'CAP-VERT', 'label': 'CAP-VERT'},
                                            {'value': 'CENTRAFRICAINE (REPUBLIQUE)', 'label': 'CENTRAFRICAINE (REPUBLIQUE)'},
                                            {'value': 'CHILI', 'label': 'CHILI'},
                                            {'value': 'CHINE', 'label': 'CHINE'},
                                            {'value': 'CHYPRE', 'label': 'CHYPRE'},
                                            {'value': 'COLOMBIE', 'label': 'COLOMBIE'},
                                            {'value': 'COMORES', 'label': 'COMORES'},
                                            {'value': 'CONGO', 'label': 'CONGO'},
                                            {'value': 'CONGO (REPUBLIQUE DEMOCRATIQUE)', 'label': 'CONGO (REPUBLIQUE DEMOCRATIQUE)'},
                                            {'value': 'COREE (REPUBLIQUE DE)', 'label': 'COREE (REPUBLIQUE DE)'},
                                            {'value': 'COREE (REPUBLIQUE POPULAIRE DEMOCRATIQUE DE)', 'label': 'COREE (REPUBLIQUE POPULAIRE DEMOCRATIQUE DE)'},
                                            {'value': 'COSTA RICA', 'label': 'COSTA RICA'},
                                            {'value': 'COTE D\'IVOIRE', 'label': 'COTE D\'IVOIRE'},
                                            {'value': 'CROATIE', 'label': 'CROATIE'},
                                            {'value': 'CUBA', 'label': 'CUBA'},
                                            {'value': 'CURAÇAO', 'label': 'CURAÇAO'},
                                            {'value': 'DANEMARK', 'label': 'DANEMARK'},
                                            {'value': 'DJIBOUTI', 'label': 'DJIBOUTI'},
                                            {'value': 'DOMINICAINE (REPUBLIQUE)', 'label': 'DOMINICAINE (REPUBLIQUE)'},
                                            {'value': 'DOMINIQUE', 'label': 'DOMINIQUE'},
                                            {'value': 'EGYPTE', 'label': 'EGYPTE'},
                                            {'value': 'SALVADOR', 'label': 'EL SALVADOR'},
                                            {'value': 'EMIRATS ARABES UNIS', 'label': 'EMIRATS ARABES UNIS'},
                                            {'value': 'EQUATEUR', 'label': 'EQUATEUR'},
                                            {'value': 'ERYTHREE', 'label': 'ERYTHREE'},
                                            {'value': 'ESPAGNE', 'label': 'ESPAGNE'},
                                            {'value': 'ESTONIE', 'label': 'ESTONIE'},
                                            {'value': 'ETATS-UNIS', 'label': 'ETATS-UNIS'},
                                            {'value': 'ETHIOPIE', 'label': 'ETHIOPIE'},
                                            {'value': 'EX-REPUBLIQUE YOUGOSLAVE DE MACEDOINE', 'label': 'EX-REPUBLIQUE YOUGOSLAVE DE MACEDOINE'},
                                            {'value': 'FIDJI', 'label': 'FIDJI'},
                                            {'value': 'FINLANDE', 'label': 'FINLANDE'},
                                            {'value': 'FRANCE', 'label': 'FRANCE', 'selected': 'selected'},
                                            {'value': 'GABON', 'label': 'GABON'},
                                            {'value': 'GAMIE', 'label': 'GAMIE'},
                                            {'value': 'GEORGIE', 'label': 'GEORGIE'},
                                            {'value': 'GHANA', 'label': 'GHANA'},
                                            {'value': 'GRECE', 'label': 'GRECE'},
                                            {'value': 'GRENADE', 'label': 'GRENADE'},
                                            {'value': 'GUATEMALA', 'label': 'GUATEMALA'},
                                            {'value': 'GUINEE', 'label': 'GUINEE'},
                                            {'value': 'GUINEE EQUATORIALE', 'label': 'GUINEE EQUATORIALE'},
                                            {'value': 'GUINEE-BISSAU', 'label': 'GUINEE-BISSAU'},
                                            {'value': 'GUYANA', 'label': 'GUYANA'},
                                            {'value': 'HAITI', 'label': 'HAITI'},
                                            {'value': 'HONDURAS', 'label': 'HONDURAS'},
                                            {'value': 'HONGRIE', 'label': 'HONGRIE'},
                                            {'value': 'INDE', 'label': 'INDE'},
                                            {'value': 'INDONESIE', 'label': 'INDONESIE'},
                                            {'value': 'IRAN', 'label': 'IRAN'},
                                            {'value': 'IRAQ', 'label': 'IRAQ'},
                                            {'value': 'IRLANDE, ou EIRE', 'label': 'IRLANDE, ou EIRE'},
                                            {'value': 'ISLANDE', 'label': 'ISLANDE'},
                                            {'value': 'ISRAEL', 'label': 'ISRAEL'},
                                            {'value': 'ITALIE', 'label': 'ITALIE'},
                                            {'value': 'JAMAIQUE', 'label': 'JAMAIQUE'},
                                            {'value': 'JAPON', 'label': 'JAPON'},
                                            {'value': 'JORDANIE', 'label': 'JORDANIE'},
                                            {'value': 'KAZAKHSTAN', 'label': 'KAZAKHSTAN'},
                                            {'value': 'KENYA', 'label': 'KENYA'},
                                            {'value': 'KIRGHIZISTAN', 'label': 'KIRGHIZISTAN'},
                                            {'value': 'KIRIBATI', 'label': 'KIRIBATI'},
                                            {'value': 'KOSOVO', 'label': 'KOSOVO'},
                                            {'value': 'KOWEIT', 'label': 'KOWEIT'},
                                            {'value': 'LAOS', 'label': 'LAOS'},
                                            {'value': 'LESOTHO', 'label': 'LESOTHO'},
                                            {'value': 'LETTONIE', 'label': 'LETTONIE'},
                                            {'value': 'LIBAN', 'label': 'LIBAN'},
                                            {'value': 'LIBERIA', 'label': 'LIBERIA'},
                                            {'value': 'LIBYE', 'label': 'LIBYE'},
                                            {'value': 'LIECHTENSTEIN', 'label': 'LIECHTENSTEIN'},
                                            {'value': 'LITUANIE', 'label': 'LITUANIE'},
                                            {'value': 'LUXEMBOURG', 'label': 'LUXEMBOURG'},
                                            {'value': 'MADAGASCAR', 'label': 'MADAGASCAR'},
                                            {'value': 'MALAISIE', 'label': 'MALAISIE'},
                                            {'value': 'MALAWI', 'label': 'MALAWI'},
                                            {'value': 'MALDIVES', 'label': 'MALDIVES'},
                                            {'value': 'MALI', 'label': 'MALI'},
                                            {'value': 'MALTE', 'label': 'MALTE'},
                                            {'value': 'MAROC', 'label': 'MAROC'},
                                            {'value': 'MARSHALL (ILES)', 'label': 'MARSHALL (ILES)'},
                                            {'value': 'MAURICE', 'label': 'MAURICE'},
                                            {'value': 'MAURITANIE', 'label': 'MAURITANIE'},
                                            {'value': 'MEXIQUE', 'label': 'MEXIQUE'},
                                            {'value': 'MICRONESIE (ETATS FEDERES DE)', 'label': 'MICRONESIE (ETATS FEDERES DE)'},
                                            {'value': 'MOLDAVIE', 'label': 'MOLDAVIE'},
                                            {'value': 'MONACO', 'label': 'MONACO'},
                                            {'value': 'MONGOLIE', 'label': 'MONGOLIE'},
                                            {'value': 'MONTENEGRO', 'label': 'MONTENEGRO'},
                                            {'value': 'MOZAMBIQUE', 'label': 'MOZAMBIQUE'},
                                            {'value': 'NAMIBIE', 'label': 'NAMIBIE'},
                                            {'value': 'NAURU', 'label': 'NAURU'},
                                            {'value': 'NEPAL', 'label': 'NEPAL'},
                                            {'value': 'NICARAGUA', 'label': 'NICARAGUA'},
                                            {'value': 'NIGER', 'label': 'NIGER'},
                                            {'value': 'NIGERIA', 'label': 'NIGERIA'},
                                            {'value': 'NORVEGE', 'label': 'NORVEGE'},
                                            {'value': 'NOUVELLE-ZELANDE', 'label': 'NOUVELLE-ZELANDE'},
                                            {'value': 'OMAN', 'label': 'OMAN'},
                                            {'value': 'OUGANDA', 'label': 'OUGANDA'},
                                            {'value': 'OUZBEKISTAN', 'label': 'OUZBEKISTAN'},
                                            {'value': 'PAKISTAN', 'label': 'PAKISTAN'},
                                            {'value': 'PALAOS (ILES)', 'label': 'PALAOS (ILES)'},
                                            {'value': 'PALESTINE (Etat de)', 'label': 'PALESTINE (Etat de)'},
                                            {'value': 'PANAMA', 'label': 'PANAMA'},
                                            {'value': 'PAPOUASIE-NOUVELLE-GUINEE', 'label': 'PAPOUASIE-NOUVELLE-GUINEE'},
                                            {'value': 'PARAGUAY', 'label': 'PARAGUAY'},
                                            {'value': 'PAYS-BAS', 'label': 'PAYS-BAS'},
                                            {'value': 'PEROU', 'label': 'PEROU'},
                                            {'value': 'PHILIPPINES', 'label': 'PHILIPPINES'},
                                            {'value': 'POLOGNE', 'label': 'POLOGNE'},
                                            {'value': 'PORTUGAL', 'label': 'PORTUGAL'},
                                            {'value': 'QATAR', 'label': 'QATAR'},
                                            {'value': 'ROUMANIE', 'label': 'ROUMANIE'},
                                            {'value': 'ROYAUME-UNI', 'label': 'ROYAUME-UNI'},
                                            {'value': 'RUSSIE', 'label': 'RUSSIE'},
                                            {'value': 'RWANDA', 'label': 'RWANDA'},
                                            {'value': 'SAINT-CHRISTOPHE-ET-NIEVES', 'label': 'SAINT-CHRISTOPHE-ET-NIEVES'},
                                            {'value': 'SAINT-MARIN', 'label': 'SAINT-MARIN'},
                                            {'value': 'SAINT-MARTIN (PARTIE NEERLANDAISE)', 'label': 'SAINT-MARTIN (PARTIE NEERLANDAISE)'},
                                            {'value': 'SAINT-VINCENT-ET-LES GRENADINES', 'label': 'SAINT-VINCENT-ET-LES GRENADINES'},
                                            {'value': 'SAINTE-LUCIE', 'label': 'SAINTE-LUCIE'},
                                            {'value': 'SALOMON (ILES)', 'label': 'SALOMON (ILES)'},
                                            {'value': 'SAMOA OCCIDENTALES', 'label': 'SAMOA OCCIDENTALES'},
                                            {'value': 'SAO TOME-ET-PRINCIPE', 'label': 'SAO TOME-ET-PRINCIPE'},
                                            {'value': 'SENEGAL', 'label': 'SENEGAL'},
                                            {'value': 'SERBIE', 'label': 'SERBIE'},
                                            {'value': 'SEYCHELLES', 'label': 'SEYCHELLES'},
                                            {'value': 'SIERRA LEONE', 'label': 'SIERRA LEONE'},
                                            {'value': 'SINGAPOUR', 'label': 'SINGAPOUR'},
                                            {'value': 'SLOVAQUIE', 'label': 'SLOVAQUIE'},
                                            {'value': 'SLOVENIE', 'label': 'SLOVENIE'},
                                            {'value': 'SOMALIE', 'label': 'SOMALIE'},
                                            {'value': 'SOUDAN', 'label': 'SOUDAN'},
                                            {'value': 'SOUDAN DU SUD', 'label': 'SOUDAN DU SUD'},
                                            {'value': 'SRI LANKA', 'label': 'SRI LANKA'},
                                            {'value': 'SUEDE', 'label': 'SUEDE'},
                                            {'value': 'SUISSE', 'label': 'SUISSE'},
                                            {'value': 'SURINAME', 'label': 'SURINAME'},
                                            {'value': 'SWAZILAND', 'label': 'SWAZILAND'},
                                            {'value': 'SYRIE', 'label': 'SYRIE'},
                                            {'value': 'TADJIKISTAN', 'label': 'TADJIKISTAN'},
                                            {'value': 'TANZANIE', 'label': 'TANZANIE'},
                                            {'value': 'TCHAD', 'label': 'TCHAD'},
                                            {'value': 'TCHEQUE (REPUBLIQUE)', 'label': 'TCHEQUE (REPUBLIQUE)'},
                                            {'value': 'THAILANDE', 'label': 'THAILANDE'},
                                            {'value': 'TIMOR ORIENTAL', 'label': 'TIMOR ORIENTAL'},
                                            {'value': 'TOGO', 'label': 'TOGO'},
                                            {'value': 'TONGA', 'label': 'TONGA'},
                                            {'value': 'TRINITE-ET-TOBAGO', 'label': 'TRINITE-ET-TOBAGO'},
                                            {'value': 'TUNISIE', 'label': 'TUNISIE'},
                                            {'value': 'TURKMENISTAN', 'label': 'TURKMENISTAN'},
                                            {'value': 'TURQUIE', 'label': 'TURQUIE'},
                                            {'value': 'TUVALU', 'label': 'TUVALU'},
                                            {'value': 'UKRAINE', 'label': 'UKRAINE'},
                                            {'value': 'URUGUAY', 'label': 'URUGUAY'},
                                            {'value': 'VANUATU', 'label': 'VANUATU'},
                                            {'value': 'VATICAN, ou SAINT-SIEGE', 'label': 'VATICAN, ou SAINT-SIEGE'},
                                            {'value': 'VENEZUELA', 'label': 'VENEZUELA'},
                                            {'value': 'VIET NAM', 'label': 'VIET NAM'},
                                            {'value': 'YEMEN', 'label': 'YEMEN'},
                                            {'value': 'ZAMBIE', 'label': 'ZAMBIE'},
                                            {'value': 'ZIMBABWE', 'label': 'ZIMBABWE'},
                                            {'value': 'SAINT-BARTHELEMY', 'label': 'SAINT-BARTHELEMY'},
                                            {'value': 'MARTINIQUE', 'label': 'MARTINIQUE'},
                                            {'value': 'LA REUNION', 'label': 'LA REUNION'},
                                            {'value': 'NOUVELLE-CALEDONIE', 'label': 'NOUVELLE-CALEDONIE'},
                                            {'value': 'BERMUDES', 'label': 'BERMUDES'},
                                            {'value': 'POLYNESIE FRANCAISE', 'label': 'POLYNESIE FRANCAISE'},
                                            {'value': 'SAINT-PIERRE-ET-MIQUELON', 'label': 'SAINT-PIERRE-ET-MIQUELON'},
                                            {'value': 'GUADELOUPE', 'label': 'GUADELOUPE'},
                                            {'value': 'GUERNESEY', 'label': 'GUERNESEY'}
                                        ]
                                    },
                                },
                                'commune': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'required': 'required',
                                    'placeholder': 'Nom de la commune*',
                                    'id': 'commune',
                                    'name': 'commune',
                                    'class': 'form-control'
                                },
                                // 'sous-colonne-droite': {
                                //     'next': {
                                //         'balise': 'a',
                                //         'href': '#informations-hebergement',
                                //         'text': '+ Passez à l\'étape 2',
                                //         'class': 'next',
                                //         'id': 'next-to-step-2'
                                //     }
                                // }
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
                    'information': {
                        'balise': 'i',
                        'text': 'Le nombre de pièce(s) pourra être amené à évoluer selon les normes du classement en vigueur et pourra impacter directement la facturation',
                        'class': 'information'
                    },
                    'not-proprietaire': {
                        'balise': 'a',
                        'text': '+ Coordonnées du propriétaire s\'il n\'est pas le demandeur',
                        'class': 'not-proprietaire'
                    },
                    'blocform-1': {
                        'style': 'display: none',
                        'sub-title-1': {
                            'subTitle': ' Information du propriétaire',
                            'class': 'sub-title sub-title-1',
                            'balise': 'h3'
                        },
                        'blocflex': {
                            'colonne-gauche': {
                                'class': 'colonne colonne-gauche pt0',
                                'sous-colonne-1': {
                                    'civilite-hebergeur': {
                                        'type': 'select',
                                        'required': '',
                                        'options': [
                                            {'value': "", 'label': 'Civilité*'},
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
                                        // 'pattern': '^[a-zA-Z ]{1,20}$',
                                        'id': 'raison-hebergeur',
                                        'name': 'raison-hebergeur',
                                        'class': 'form-control'
                                    },
                                    'nom-hebergeur': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'placeholder': 'Nom',
                                        // 'pattern': '^[a-zA-Z ]{1,20}$',
                                        'id': 'nom-hebergeur',
                                        'name': 'nom-hebergeur',
                                        'class': 'form-control'
                                    },
                                    'prenom-hebergeur': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'placeholder': 'Prénom',
                                        // 'pattern': '^[a-zA-Z ]{1,20}$',
                                        'id': 'prenom-hebergeur',
                                        'name': 'prenom-hebergeur',
                                        'class': 'form-control'
                                    },
                                },
                                'siret-hebergeur': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'placeholder': 'Ajouter un SIRET/SIREN (optionnel)',
                                    //'pattern': '^[a-zA-Z ]{1,20}$',
                                    'id': 'siret-hebergeur',
                                    'name': 'siret-hebergeur',
                                    'class': 'form-control'
                                },
                                'sous-colonne-2': {
                                    'email-hebergeur': {
                                        'balise': 'input',
                                        'type': 'email',
                                        'required': '',
                                        'placeholder': 'Mail principal*',
                                        'pattern': '[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+.[a-zA-Z.]{2,50}',
                                        'id': 'email-hebergeur',
                                        'name': 'email-hebergeur',
                                        'class': 'form-control'
                                    },
                                    'tel-hebergeur': {
                                        'balise': 'input',
                                        'type': 'tel',
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
                                    'placeholder': 'Adresse*',
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
                                        'placeholder': 'Code postal*',
                                        'pattern': '[0-9]{5}',
                                        'minlength': "5",
                                        'maxlength': "5",
                                        'id': 'code-postal-hebergeur',
                                        'name': 'code-postal-hebergeur',
                                        'class': 'form-control'
                                    },
                                    'pays-hebergeur': {
                                        'type': 'select',
                                        'placeholder': 'Pays*',
                                        'id': 'pays-hebergeur',
                                        'name': 'pays-hebergeur',
                                        'class': 'form-control',
                                        'options': [
                                            {'value': "", 'label': 'Pays*'},
                                            {'value': "AFGHANISTAN", 'label': 'AFGHANISTAN'},
                                            {'value': 'AFRIQUE DU SUD', 'label': 'AFRIQUE DU SUD'},
                                            {'value': 'ALBANIE', 'label': 'ALBANIE'},
                                            {'value': 'ALGERIE', 'label': 'ALGERIE'},
                                            {'value': 'ALLEMAGNE', 'label': 'ALLEMAGNE'},
                                            {'value': 'ANDORRE', 'label': 'ANDORRE'},
                                            {'value': 'ANGOLA', 'label': 'ANGOLA'},
                                            {'value': 'ANTIGUA-ET-BARBUDA', 'label': 'ANTIGUA-ET-BARBUDA'},
                                            {'value': 'ARABIE SAOUDITE', 'label': 'ARABIE SAOUDITE'},
                                            {'value': 'ARGENTINE', 'label': 'ARGENTINE'},
                                            {'value': 'ARMENIE', 'label': 'ARMENIE'},
                                            {'value': 'AUSTRALIE', 'label': 'AUSTRALIE'},
                                            {'value': 'AUTRICHE', 'label': 'AUTRICHE'},
                                            {'value': 'AZERBAIDJAN', 'label': 'AZERBAIDJAN'},
                                            {'value': 'BAHAMAS', 'label': 'BAHAMAS'},
                                            {'value': 'BAHREIN', 'label': 'BAHREIN'},
                                            {'value': 'BANGLADESH', 'label': 'BANGLADESH'},
                                            {'value': 'BARBADE', 'label': 'BARBADE'},
                                            {'value': 'BELGIQUE', 'label': 'BELGIQUE'},
                                            {'value': 'BELIZE', 'label': 'BELIZE'},
                                            {'value': 'BENIN', 'label': 'BENIN'},
                                            {'value': 'BHOUTAN', 'label': 'BHOUTAN'},
                                            {'value': 'BIELORUSSIE', 'label': 'BIELORUSSIE'},
                                            {'value': 'BIRMANIE', 'label': 'BIRMANIE'},
                                            {'value': 'BOLIVIE', 'label': 'BOLIVIE'},
                                            {'value': 'BONAIRE, SAINT EUSTACHE ET SABA', 'label': 'BONAIRE, SAINT EUSTACHE ET SABA'},
                                            {'value': 'BOSNIE-HERZEGOVINE', 'label': 'BOSNIE-HERZEGOVINE'},
                                            {'value': 'BOTSWANA', 'label': 'BOTSWANA'},
                                            {'value': 'BRESIL', 'label': 'BRESIL'},
                                            {'value': 'BRUNEI', 'label': 'BRUNEI'},
                                            {'value': 'BULGARIE', 'label': 'BULGARIE'},
                                            {'value': 'BURKINA', 'label': 'BURKINA'},
                                            {'value': 'BURUNDI', 'label': 'BURUNDI'},
                                            {'value': 'CAMBODGE', 'label': 'CAMBODGE'},
                                            {'value': 'CAMEROUN', 'label': 'CAMEROUN'},
                                            {'value': 'CANADA', 'label': 'CANADA'},
                                            {'value': 'CAP-VERT', 'label': 'CAP-VERT'},
                                            {'value': 'CENTRAFRICAINE (REPUBLIQUE)', 'label': 'CENTRAFRICAINE (REPUBLIQUE)'},
                                            {'value': 'CHILI', 'label': 'CHILI'},
                                            {'value': 'CHINE', 'label': 'CHINE'},
                                            {'value': 'CHYPRE', 'label': 'CHYPRE'},
                                            {'value': 'COLOMBIE', 'label': 'COLOMBIE'},
                                            {'value': 'COMORES', 'label': 'COMORES'},
                                            {'value': 'CONGO', 'label': 'CONGO'},
                                            {'value': 'CONGO (REPUBLIQUE DEMOCRATIQUE)', 'label': 'CONGO (REPUBLIQUE DEMOCRATIQUE)'},
                                            {'value': 'COREE (REPUBLIQUE DE)', 'label': 'COREE (REPUBLIQUE DE)'},
                                            {'value': 'COREE (REPUBLIQUE POPULAIRE DEMOCRATIQUE DE)', 'label': 'COREE (REPUBLIQUE POPULAIRE DEMOCRATIQUE DE)'},
                                            {'value': 'COSTA RICA', 'label': 'COSTA RICA'},
                                            {'value': 'COTE D\'IVOIRE', 'label': 'COTE D\'IVOIRE'},
                                            {'value': 'CROATIE', 'label': 'CROATIE'},
                                            {'value': 'CUBA', 'label': 'CUBA'},
                                            {'value': 'CURAÇAO', 'label': 'CURAÇAO'},
                                            {'value': 'DANEMARK', 'label': 'DANEMARK'},
                                            {'value': 'DJIBOUTI', 'label': 'DJIBOUTI'},
                                            {'value': 'DOMINICAINE (REPUBLIQUE)', 'label': 'DOMINICAINE (REPUBLIQUE)'},
                                            {'value': 'DOMINIQUE', 'label': 'DOMINIQUE'},
                                            {'value': 'EGYPTE', 'label': 'EGYPTE'},
                                            {'value': 'SALVADOR', 'label': 'EL SALVADOR'},
                                            {'value': 'EMIRATS ARABES UNIS', 'label': 'EMIRATS ARABES UNIS'},
                                            {'value': 'EQUATEUR', 'label': 'EQUATEUR'},
                                            {'value': 'ERYTHREE', 'label': 'ERYTHREE'},
                                            {'value': 'ESPAGNE', 'label': 'ESPAGNE'},
                                            {'value': 'ESTONIE', 'label': 'ESTONIE'},
                                            {'value': 'ETATS-UNIS', 'label': 'ETATS-UNIS'},
                                            {'value': 'ETHIOPIE', 'label': 'ETHIOPIE'},
                                            {'value': 'EX-REPUBLIQUE YOUGOSLAVE DE MACEDOINE', 'label': 'EX-REPUBLIQUE YOUGOSLAVE DE MACEDOINE'},
                                            {'value': 'FIDJI', 'label': 'FIDJI'},
                                            {'value': 'FINLANDE', 'label': 'FINLANDE'},
                                            {'value': 'FRANCE', 'label': 'FRANCE'},
                                            {'value': 'GABON', 'label': 'GABON'},
                                            {'value': 'GAMIE', 'label': 'GAMIE'},
                                            {'value': 'GEORGIE', 'label': 'GEORGIE'},
                                            {'value': 'GHANA', 'label': 'GHANA'},
                                            {'value': 'GRECE', 'label': 'GRECE'},
                                            {'value': 'GRENADE', 'label': 'GRENADE'},
                                            {'value': 'GUATEMALA', 'label': 'GUATEMALA'},
                                            {'value': 'GUINEE', 'label': 'GUINEE'},
                                            {'value': 'GUINEE EQUATORIALE', 'label': 'GUINEE EQUATORIALE'},
                                            {'value': 'GUINEE-BISSAU', 'label': 'GUINEE-BISSAU'},
                                            {'value': 'GUYANA', 'label': 'GUYANA'},
                                            {'value': 'HAITI', 'label': 'HAITI'},
                                            {'value': 'HONDURAS', 'label': 'HONDURAS'},
                                            {'value': 'HONGRIE', 'label': 'HONGRIE'},
                                            {'value': 'INDE', 'label': 'INDE'},
                                            {'value': 'INDONESIE', 'label': 'INDONESIE'},
                                            {'value': 'IRAN', 'label': 'IRAN'},
                                            {'value': 'IRAQ', 'label': 'IRAQ'},
                                            {'value': 'IRLANDE, ou EIRE', 'label': 'IRLANDE, ou EIRE'},
                                            {'value': 'ISLANDE', 'label': 'ISLANDE'},
                                            {'value': 'ISRAEL', 'label': 'ISRAEL'},
                                            {'value': 'ITALIE', 'label': 'ITALIE'},
                                            {'value': 'JAMAIQUE', 'label': 'JAMAIQUE'},
                                            {'value': 'JAPON', 'label': 'JAPON'},
                                            {'value': 'JORDANIE', 'label': 'JORDANIE'},
                                            {'value': 'KAZAKHSTAN', 'label': 'KAZAKHSTAN'},
                                            {'value': 'KENYA', 'label': 'KENYA'},
                                            {'value': 'KIRGHIZISTAN', 'label': 'KIRGHIZISTAN'},
                                            {'value': 'KIRIBATI', 'label': 'KIRIBATI'},
                                            {'value': 'KOSOVO', 'label': 'KOSOVO'},
                                            {'value': 'KOWEIT', 'label': 'KOWEIT'},
                                            {'value': 'LAOS', 'label': 'LAOS'},
                                            {'value': 'LESOTHO', 'label': 'LESOTHO'},
                                            {'value': 'LETTONIE', 'label': 'LETTONIE'},
                                            {'value': 'LIBAN', 'label': 'LIBAN'},
                                            {'value': 'LIBERIA', 'label': 'LIBERIA'},
                                            {'value': 'LIBYE', 'label': 'LIBYE'},
                                            {'value': 'LIECHTENSTEIN', 'label': 'LIECHTENSTEIN'},
                                            {'value': 'LITUANIE', 'label': 'LITUANIE'},
                                            {'value': 'LUXEMBOURG', 'label': 'LUXEMBOURG'},
                                            {'value': 'MADAGASCAR', 'label': 'MADAGASCAR'},
                                            {'value': 'MALAISIE', 'label': 'MALAISIE'},
                                            {'value': 'MALAWI', 'label': 'MALAWI'},
                                            {'value': 'MALDIVES', 'label': 'MALDIVES'},
                                            {'value': 'MALI', 'label': 'MALI'},
                                            {'value': 'MALTE', 'label': 'MALTE'},
                                            {'value': 'MAROC', 'label': 'MAROC'},
                                            {'value': 'MARSHALL (ILES)', 'label': 'MARSHALL (ILES)'},
                                            {'value': 'MAURICE', 'label': 'MAURICE'},
                                            {'value': 'MAURITANIE', 'label': 'MAURITANIE'},
                                            {'value': 'MEXIQUE', 'label': 'MEXIQUE'},
                                            {'value': 'MICRONESIE (ETATS FEDERES DE)', 'label': 'MICRONESIE (ETATS FEDERES DE)'},
                                            {'value': 'MOLDAVIE', 'label': 'MOLDAVIE'},
                                            {'value': 'MONACO', 'label': 'MONACO'},
                                            {'value': 'MONGOLIE', 'label': 'MONGOLIE'},
                                            {'value': 'MONTENEGRO', 'label': 'MONTENEGRO'},
                                            {'value': 'MOZAMBIQUE', 'label': 'MOZAMBIQUE'},
                                            {'value': 'NAMIBIE', 'label': 'NAMIBIE'},
                                            {'value': 'NAURU', 'label': 'NAURU'},
                                            {'value': 'NEPAL', 'label': 'NEPAL'},
                                            {'value': 'NICARAGUA', 'label': 'NICARAGUA'},
                                            {'value': 'NIGER', 'label': 'NIGER'},
                                            {'value': 'NIGERIA', 'label': 'NIGERIA'},
                                            {'value': 'NORVEGE', 'label': 'NORVEGE'},
                                            {'value': 'NOUVELLE-ZELANDE', 'label': 'NOUVELLE-ZELANDE'},
                                            {'value': 'OMAN', 'label': 'OMAN'},
                                            {'value': 'OUGANDA', 'label': 'OUGANDA'},
                                            {'value': 'OUZBEKISTAN', 'label': 'OUZBEKISTAN'},
                                            {'value': 'PAKISTAN', 'label': 'PAKISTAN'},
                                            {'value': 'PALAOS (ILES)', 'label': 'PALAOS (ILES)'},
                                            {'value': 'PALESTINE (Etat de)', 'label': 'PALESTINE (Etat de)'},
                                            {'value': 'PANAMA', 'label': 'PANAMA'},
                                            {'value': 'PAPOUASIE-NOUVELLE-GUINEE', 'label': 'PAPOUASIE-NOUVELLE-GUINEE'},
                                            {'value': 'PARAGUAY', 'label': 'PARAGUAY'},
                                            {'value': 'PAYS-BAS', 'label': 'PAYS-BAS'},
                                            {'value': 'PEROU', 'label': 'PEROU'},
                                            {'value': 'PHILIPPINES', 'label': 'PHILIPPINES'},
                                            {'value': 'POLOGNE', 'label': 'POLOGNE'},
                                            {'value': 'PORTUGAL', 'label': 'PORTUGAL'},
                                            {'value': 'QATAR', 'label': 'QATAR'},
                                            {'value': 'ROUMANIE', 'label': 'ROUMANIE'},
                                            {'value': 'ROYAUME-UNI', 'label': 'ROYAUME-UNI'},
                                            {'value': 'RUSSIE', 'label': 'RUSSIE'},
                                            {'value': 'RWANDA', 'label': 'RWANDA'},
                                            {'value': 'SAINT-CHRISTOPHE-ET-NIEVES', 'label': 'SAINT-CHRISTOPHE-ET-NIEVES'},
                                            {'value': 'SAINT-MARIN', 'label': 'SAINT-MARIN'},
                                            {'value': 'SAINT-MARTIN (PARTIE NEERLANDAISE)', 'label': 'SAINT-MARTIN (PARTIE NEERLANDAISE)'},
                                            {'value': 'SAINT-VINCENT-ET-LES GRENADINES', 'label': 'SAINT-VINCENT-ET-LES GRENADINES'},
                                            {'value': 'SAINTE-LUCIE', 'label': 'SAINTE-LUCIE'},
                                            {'value': 'SALOMON (ILES)', 'label': 'SALOMON (ILES)'},
                                            {'value': 'SAMOA OCCIDENTALES', 'label': 'SAMOA OCCIDENTALES'},
                                            {'value': 'SAO TOME-ET-PRINCIPE', 'label': 'SAO TOME-ET-PRINCIPE'},
                                            {'value': 'SENEGAL', 'label': 'SENEGAL'},
                                            {'value': 'SERBIE', 'label': 'SERBIE'},
                                            {'value': 'SEYCHELLES', 'label': 'SEYCHELLES'},
                                            {'value': 'SIERRA LEONE', 'label': 'SIERRA LEONE'},
                                            {'value': 'SINGAPOUR', 'label': 'SINGAPOUR'},
                                            {'value': 'SLOVAQUIE', 'label': 'SLOVAQUIE'},
                                            {'value': 'SLOVENIE', 'label': 'SLOVENIE'},
                                            {'value': 'SOMALIE', 'label': 'SOMALIE'},
                                            {'value': 'SOUDAN', 'label': 'SOUDAN'},
                                            {'value': 'SOUDAN DU SUD', 'label': 'SOUDAN DU SUD'},
                                            {'value': 'SRI LANKA', 'label': 'SRI LANKA'},
                                            {'value': 'SUEDE', 'label': 'SUEDE'},
                                            {'value': 'SUISSE', 'label': 'SUISSE'},
                                            {'value': 'SURINAME', 'label': 'SURINAME'},
                                            {'value': 'SWAZILAND', 'label': 'SWAZILAND'},
                                            {'value': 'SYRIE', 'label': 'SYRIE'},
                                            {'value': 'TADJIKISTAN', 'label': 'TADJIKISTAN'},
                                            {'value': 'TANZANIE', 'label': 'TANZANIE'},
                                            {'value': 'TCHAD', 'label': 'TCHAD'},
                                            {'value': 'TCHEQUE (REPUBLIQUE)', 'label': 'TCHEQUE (REPUBLIQUE)'},
                                            {'value': 'THAILANDE', 'label': 'THAILANDE'},
                                            {'value': 'TIMOR ORIENTAL', 'label': 'TIMOR ORIENTAL'},
                                            {'value': 'TOGO', 'label': 'TOGO'},
                                            {'value': 'TONGA', 'label': 'TONGA'},
                                            {'value': 'TRINITE-ET-TOBAGO', 'label': 'TRINITE-ET-TOBAGO'},
                                            {'value': 'TUNISIE', 'label': 'TUNISIE'},
                                            {'value': 'TURKMENISTAN', 'label': 'TURKMENISTAN'},
                                            {'value': 'TURQUIE', 'label': 'TURQUIE'},
                                            {'value': 'TUVALU', 'label': 'TUVALU'},
                                            {'value': 'UKRAINE', 'label': 'UKRAINE'},
                                            {'value': 'URUGUAY', 'label': 'URUGUAY'},
                                            {'value': 'VANUATU', 'label': 'VANUATU'},
                                            {'value': 'VATICAN, ou SAINT-SIEGE', 'label': 'VATICAN, ou SAINT-SIEGE'},
                                            {'value': 'VENEZUELA', 'label': 'VENEZUELA'},
                                            {'value': 'VIET NAM', 'label': 'VIET NAM'},
                                            {'value': 'YEMEN', 'label': 'YEMEN'},
                                            {'value': 'ZAMBIE', 'label': 'ZAMBIE'},
                                            {'value': 'ZIMBABWE', 'label': 'ZIMBABWE'},
                                            {'value': 'SAINT-BARTHELEMY', 'label': 'SAINT-BARTHELEMY'},
                                            {'value': 'MARTINIQUE', 'label': 'MARTINIQUE'},
                                            {'value': 'LA REUNION', 'label': 'LA REUNION'},
                                            {'value': 'NOUVELLE-CALEDONIE', 'label': 'NOUVELLE-CALEDONIE'},
                                            {'value': 'BERMUDES', 'label': 'BERMUDES'},
                                            {'value': 'POLYNESIE FRANCAISE', 'label': 'POLYNESIE FRANCAISE'},
                                            {'value': 'SAINT-PIERRE-ET-MIQUELON', 'label': 'SAINT-PIERRE-ET-MIQUELON'},
                                            {'value': 'GUADELOUPE', 'label': 'GUADELOUPE'},
                                            {'value': 'GUERNESEY', 'label': 'GUERNESEY'}
                                        ]
                                    },
                                },
                                'commune-hebergeur': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'required': '',
                                    'placeholder': 'Nom de la commune*',
                                    'id': 'commune-hebergeur',
                                    'name': 'commune-hebergeur',
                                    'class': 'form-control'
                                }
                            },
                        },
                    },
                    'blocform-2': {
                        'sub-title-2': {
                            'subTitle': ' Information de l\'hébergement',
                            'class': 'sub-title sub-title-2',
                            'balise': 'h3'
                        },
                        'blocflex-1': {
                            'colonne-gauche': {
                                'class': 'colonne colonne-gauche pt0 pb0',
                                'nom-hebergement': {
                                    'balise': 'input',
                                    'type': 'text',
                                    'placeholder': 'Nom',
                                    // 'pattern': '^[a-zA-Z0-9à-ž ]{1,50}$',
                                    'id': 'nom-hebergement',
                                    'name': 'nom-hebergement',
                                    'class': 'form-control'
                                },
                                'sous-colonne-1': {
                                    'adresse-hebergement': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'required': 'required',
                                        'placeholder': 'Adresse*',
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
                                // 'sous-colonne-1': {
                                //     'departement-hebergement': {
                                //         'type': 'select',
                                //         'required': 'required',
                                //         'options': [
                                //             {'value': "", 'label': 'Département'},
                                //             {'value': '01', 'label': '01 - Ain'},
                                //             {'value': '02', 'label': '02 - Aisne'},
                                //             {'value': '03', 'label': '03 - Allier'},
                                //             {'value': '04', 'label': '04 - Alpes de Haute-Provence'},
                                //             {'value': '05', 'label': '05 - Hautes-Alpes'},
                                //             {'value': '06', 'label': '06 - Alpes-Maritimes'},
                                //             {'value': '07', 'label': '07 - Ardêche'},
                                //             {'value': '08', 'label': '08 - Ardennes'},
                                //             {'value': '09', 'label': '09 - Ariège'},
                                //             {'value': '10', 'label': '10 - Aube'},
                                //             {'value': '11', 'label': '11 - Aude'},
                                //             {'value': '12', 'label': '12 - Aveyron'},
                                //             {'value': '13', 'label': '13 - Bouches-du-Rhône'},
                                //             {'value': '14', 'label': '14 - Calvados'},
                                //             {'value': '15', 'label': '15 - Cantal'},
                                //             {'value': '16', 'label': '16 - Charente'},
                                //             {'value': '17', 'label': '17 - Charente-Maritime'},
                                //             {'value': '18', 'label': '18 - Cher'},
                                //             {'value': '19', 'label': '19 - Corrèze'},
                                //             {'value': '2A', 'label': '2A - Corse-du-Sud'},
                                //             {'value': '2B', 'label': '2B - Haute-Corse'},
                                //             {'value': '21', 'label': '21 - Côte-d\'Or'},
                                //             {'value': '22', 'label': '22 - Côtes d\'Armor'},
                                //             {'value': '23', 'label': '23 - Creuse'},
                                //             {'value': '24', 'label': '24 - Dordogne'},
                                //             {'value': '25', 'label': '25 - Doubs'},
                                //             {'value': '26', 'label': '26 - Drôme'},
                                //             {'value': '27', 'label': '27 - Eure'},
                                //             {'value': '28', 'label': '28 - Eure-et-Loir'},
                                //             {'value': '29', 'label': '29 - Finistère'},
                                //             {'value': '30', 'label': '30 - Gard'},
                                //             {'value': '31', 'label': '31 - Haute-Garonne'},
                                //             {'value': '32', 'label': '32 - Gers'},
                                //             {'value': '33', 'label': '33 - Gironde'},
                                //             {'value': '34', 'label': '34 - Hérault'},
                                //             {'value': '35', 'label': '35 - Île-et-Vilaine'},
                                //             {'value': '36', 'label': '36 - Indre'},
                                //             {'value': '37', 'label': '37 - Indre-et-Loire'},
                                //             {'value': '38', 'label': '38 - Isère'},
                                //             {'value': '39', 'label': '39 - Jura'},
                                //             {'value': '40', 'label': '40 - Landes'},
                                //             {'value': '41', 'label': '41 - Loir-et-Cher'},
                                //             {'value': '42', 'label': '42 - Loire'},
                                //             {'value': '43', 'label': '43 - Haute-Loire'},
                                //             {'value': '44', 'label': '44 - Loire-Atlantique'},
                                //             {'value': '45', 'label': '45 - Loiret'},
                                //             {'value': '46', 'label': '46 - Lot'},
                                //             {'value': '47', 'label': '47 - Lot-et-Garonne'},
                                //             {'value': '48', 'label': '48 - Lozère'},
                                //             {'value': '49', 'label': '49 - Maine-et-Loire'},
                                //             {'value': '50', 'label': '50 - Manche'},
                                //             {'value': '51', 'label': '51 - Marne'},
                                //             {'value': '52', 'label': '52 - Haute-Marne'},
                                //             {'value': '53', 'label': '53 - Mayenne'},
                                //             {'value': '54', 'label': '54 - Meurthe-et-Moselle'},
                                //             {'value': '55', 'label': '55 - Meuse'},
                                //             {'value': '56', 'label': '56 - Morbihan'},
                                //             {'value': '57', 'label': '57 - Moselle'},
                                //             {'value': '58', 'label': '58 - Nièvre'},
                                //             {'value': '59', 'label': '59 - Nord'},
                                //             {'value': '60', 'label': '60 - Oise'},
                                //             {'value': '61', 'label': '61 - Orne'},
                                //             {'value': '62', 'label': '62 - Pas-de-Calais'},
                                //             {'value': '63', 'label': '63 - Puy-de-Dôme'},
                                //             {'value': '64', 'label': '64 - Pyrénées-Atlantiques'},
                                //             {'value': '65', 'label': '65 - Hautes-Pyrénées'},
                                //             {'value': '66', 'label': '66 - Pyrénées-Orientales'},
                                //             {'value': '67', 'label': '67 - Bas-Rhin'},
                                //             {'value': '68', 'label': '68 - Haut-Rhin'},
                                //             {'value': '69', 'label': '69 - Rhône'},
                                //             {'value': '70', 'label': '70 - Haute-Saône'},
                                //             {'value': '71', 'label': '71 - Saône-et-Loire'},
                                //             {'value': '72', 'label': '72 - Sarthe'},
                                //             {'value': '73', 'label': '73 - Savoie'},
                                //             {'value': '74', 'label': '74 - Haute-Savoie'},
                                //             {'value': '75', 'label': '75 - Paris'},
                                //             {'value': '76', 'label': '76 - Seine-Maritime'},
                                //             {'value': '77', 'label': '77 - Seine-et-Marne'},
                                //             {'value': '78', 'label': '78 - Yvelines'},
                                //             {'value': '79', 'label': '79 - Deux-Sèvres'},
                                //             {'value': '80', 'label': '80 - Somme'},
                                //             {'value': '81', 'label': '81 - Tarn'},
                                //             {'value': '82', 'label': '82 - Tarn-et-Garonne'},
                                //             {'value': '83', 'label': '83 - Var'},
                                //             {'value': '84', 'label': '84 - Vaucluse'},
                                //             {'value': '85', 'label': '85 - Vendée'},
                                //             {'value': '86', 'label': '86 - Vienne'},
                                //             {'value': '87', 'label': '87 - Haute-Vienne'},
                                //             {'value': '88', 'label': '88 - Vosges'},
                                //             {'value': '89', 'label': '89 - Yonne'},
                                //             {'value': '90', 'label': '90 - Territoire-de-Belfort'},
                                //             {'value': '91', 'label': '91 - Essonne'},
                                //             {'value': '92', 'label': '92 - Hauts-de-Seine'},
                                //             {'value': '93', 'label': '93 - Seine-Saint-Denis'},
                                //             {'value': '94', 'label': '94 - Val-de-Marne'},
                                //             {'value': '95', 'label': '95 - Val-d\'Oise'}
                                //         ],
                                //         'id': 'departement-hebergement',
                                //         'name': 'departement-hebergement',
                                //         'class': 'form-control'
                                //     },
                                // },
                                'sous-colonne-2': {
                                    'code-postal-hebergement': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'required': 'required',
                                        'placeholder': 'Code Postal*',
                                        'id': 'code-postal-hebergement',
                                        'name': 'code-postal-hebergement',
                                        'class': 'form-control'
                                    },
                                    'commune-hebergement': {
                                        'balise': 'input',
                                        'type': 'text',
                                        'required': 'required',
                                        'placeholder': 'Nom de la commune*',
                                        'id': 'commune-hebergement',
                                        'name': 'commune-hebergement',
                                        'class': 'form-control'
                                    },
                                    'tel-hebergement': {
                                        'balise': 'input',
                                        'type': 'tel',
                                        'placeholder': 'Téléphone',
                                        // 'pattern': '^(?:(?:\\+|00)33[\\s.-]{0,3}(?:\\(0\\)[\\s.-]{0,3})?|0)[1-9](?:(?:[\\s.-]?\\d{2}){4}|\\d{2}(?:[\\s.-]?\\d{3}){2})$',
                                        'id': 'tel-hebergeur',
                                        'name': 'tel-hebergeur',
                                        'class': 'form-control'
                                    },
                                    'etage-hebergement': {
                                        'type': 'select',
                                        'required': 'required',
                                        'options': [
                                            {'value': "", 'label': 'Étage*'},
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
                        'sub-title-3': {
                            'subTitle': ' Identification de l\'hébergement',
                            'class': 'sub-title sub-title-3',
                            'balise': 'h3'
                        },
                        'blocflex-2': {
                            'colonne-gauche': {
                                'class': 'colonne colonne-gauche pt0',
                                'type-hebergement': {
                                    'type': 'select',
                                    'required': 'required',
                                    'options': [
                                        {'value': "", 'label': 'Type de logement du meublé*'},
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
                                        {'value': 'Autre', 'label': 'Autre'},
                                        {'value': 'T1', 'label': 'T1'},
                                        {'value': 'T2', 'label': 'T2'},
                                        {'value': 'T3', 'label': 'T3'},
                                        {'value': 'T4', 'label': 'T4'},
                                        {'value': 'T5', 'label': 'T5'}
                                    ],
                                    'id': 'type-hebergement',
                                    'name': 'type-hebergement',
                                    'class': 'form-control'
                                },
                                'capacite-hebergement': {
                                    'balise': 'input',
                                    'type': 'number',
                                    'required': 'required',
                                    'placeholder': 'Capacité classée demandée*',
                                    'id': 'capacite-hebergement',
                                    'name': 'capacite-hebergement',
                                    'class': 'form-control',
                                    'min': 0
                                },
                                'nbpieces-hebergement': {
                                    'balise': 'input',
                                    'type': 'number',
                                    'placeholder': 'Nombre de pièces composant le meublé',
                                    'id': 'nbpieces-hebergement',
                                    'name': 'nbpieces-hebergement',
                                    'class': 'form-control',
                                    'min': 0
                                },
                                'nbchambre-hebergement': {
                                    'balise': 'input',
                                    'type': 'number',
                                    'placeholder': 'Nombre de chambre(s)/cabine(s)',
                                    'id': 'nbchambre-hebergement',
                                    'name': 'nbchambre-hebergement',
                                    'class': 'form-control',
                                    'min': 0
                                }
                            },
                            'colonne-droite': {
                                'class': 'colonne colonne-droite pt0',
                                'classement-hebergement': {
                                    'type': 'select',
                                    'required': 'required',
                                    'options': [
                                        {'value': "", 'label': 'Classement actuel*'},
                                        {'value': '0', 'label': 'Non-classé'},
                                        {'value': '1', 'label': '1 ★'},
                                        {'value': '2', 'label': '2 ★'},
                                        {'value': '3', 'label': '3 ★'},
                                        {'value': '4', 'label': '4 ★'},
                                        {'value': '5', 'label': '5 ★'},
                                    ],
                                    'id': 'classement-hebergement',
                                    'name': 'classement-hebergement',
                                    'class': 'form-control'
                                },
                                'eligibilite-demandee': {
                                    'type': 'select',
                                    'required': 'required',
                                    'options': [
                                        {'value': "", 'label': 'Éligibilité demandée*'},
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
                                    'placeholder': 'Surface totale',
                                    'id': 'surface-hebergement',
                                    'name': 'surface-hebergement',
                                    'class': 'form-control',
                                    'min': 0
                                },
                                'surface-ss-sdb-hebergement': {
                                    'balise': 'input',
                                    'type': 'number',
                                    'step': 0.01,
                                    'placeholder': 'Surface hors salle de bain et WC',
                                    'id': 'surface-ss-sdb-hebergement',
                                    'name': 'surface-ss-sdb-hebergement',
                                    'class': 'form-control',
                                    'min': 0
                                },
                            },
                        },
                    }
                }
            },
            'commentaire': {
                'title': {
                    'title': ' Commentaire',
                    'page1': '',
                    'page2': 'active',
                    'page3': '',
                    'id': 'informations-hebergement',
                    'class': 'cl_titre',
                    'balise': 'h2'
                },
                'content': {
                    'blocform-1': {
                        'sub-title-4': {
                            'subTitle': ' Informations complémentaires',
                            'class': 'sub-title sub-title-4',
                            'balise': 'h3'
                        },
                        'sub-title-5': {
                            'subTitle': ' Merci d\'indiquer dans le champ ci-dessous vos disponibilités ainsi que toute information susceptible d\'être essentielle au traitement de votre demande',
                            'class': 'sub-title sub-title-5 ml4',
                            'balise': 'span'
                        },
                        'blocflex': {
                            'colonne': {
                                'class': 'colonne colonne-gauche w-100 pt0 mt2',
                                'comment': {
                                    'balise': 'textarea',
                                    'placeholder': 'Commentaire',
                                    // 'pattern': '^[a-zA-Z ]{1,20}$',
                                    'id': 'comment',
                                    'name': 'comment',
                                    'class': 'form-control'
                                },
                            }
                        }
                    }
                }
            }
        };
    }

    validate (section = null) {
        const form = document.createElement('form');
        console.log(form);
        const formData = new FormData(form);
        console.log(formData.values());
        return true;
    }

    sendForm () {
        document.getElementById("loader").style.display = "block";

        var isHide = (document.getElementById('not-proprietaire').nextSibling.style.display === 'none') ? true : false;
        var owner = {};

        if(!isHide) {
            owner = {
                "civility": document.getElementById("civilite-hebergeur").value,
                "buisinessName": document.getElementById("raison-hebergeur").value,
                "firstName": document.getElementById("prenom-hebergeur").value,
                "lastName": document.getElementById("nom-hebergeur").value,
                "siret": document.getElementById("siret-hebergeur").value,
                "mail": document.getElementById("email-hebergeur").value,
                "phone": document.getElementById("tel-hebergeur").value,
                "address": document.getElementById("adresse-hebergeur").value,
                "additionnalAddress": document.getElementById("complement-ad-hebergeur").value,
                "postalCode": document.getElementById("code-postal-hebergeur").value,
                "city": document.getElementById("commune-hebergeur").value,
                "country": document.getElementById("pays-hebergeur").value
            };
        }

        var data = {
            "data" : {
                "request": {
                    "source": "snippet-form",
                    "snippet-token": this.getToken(),
                    "eligDemandee": document.getElementById("eligibilite-demandee").value,
                    "capClassee": document.getElementById('capacite-hebergement').value,
                    "nbPiecesSupp": (document.getElementById("nbpieces-hebergement").value !== "") ? document.getElementById('nbpieces-hebergement').value - 1 : 0, /* nbPiecesTot - 1 */
                    "comment": document.getElementById('comment').value
                },
                "accommodation": {
                    "name": document.getElementById("nom-hebergement").value,
                    "floor": document.getElementById("etage-hebergement").value,
                    "subtype": document.getElementById("type-hebergement").value,
                    "phone": document.getElementById("tel-hebergement").value,
                    "address": document.getElementById("adresse-hebergement").value,
                    "additionnalAddress": document.getElementById("complement-ad-hebergement").value,
                    // "departement": document.getElementById("departement-hebergement").value,
                    "codePostal": document.getElementById("code-postal-hebergement").value,
                    "city": document.getElementById("commune-hebergement").value,
                    "surface": (document.getElementById("surface-hebergement").value !== "") ? document.getElementById("surface-hebergement").value : 0,
                    "surfaceHsdb": (document.getElementById("surface-ss-sdb-hebergement").value !== "") ? document.getElementById("surface-ss-sdb-hebergement").value : 0,
                    "nbPersonsClasse": document.getElementById("capacite-hebergement").value,
                    "nbCabine": (document.getElementById("nbchambre-hebergement").value !== "") ? document.getElementById("nbchambre-hebergement").value : 0,
                    "nbPiecesTot": (document.getElementById("nbpieces-hebergement").value !== "") ? document.getElementById("nbpieces-hebergement").value : 0,
                    "currentRanking": document.getElementById("classement-hebergement").value,
                    "owner": owner,
                    "applicant": {
                        "civility": document.getElementById("civilite").value,
                        "buisinessName": document.getElementById("raison").value,
                        "firstName": document.getElementById("prenom").value,
                        "lastName": document.getElementById("nom").value,
                        "siret": document.getElementById("siret").value,
                        "mail": document.getElementById("email").value,
                        "phone": document.getElementById("tel").value,
                        "address": document.getElementById("adresse").value,
                        "additionnalAddress": document.getElementById("complement-ad").value,
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
        }).then((response) => {
            console.log('first then');
            if (response.ok) {
                console.log('ok');
                return response.json();
            } else {
                return response.json().then( error => {
                    console.log('then Error');
                    throw new Error(error.data);
                } );
            }
            //return Promise.reject(response);
        }).then((data) => {
            document.getElementById("loader").style.display = "none";
            console.log('second then');
            this.onSendFormSuccess(data);
        }).catch(error => {
            document.getElementById("loader").style.display = "none";
            console.log('catch');
            this.onSendFormError(error);
            console.warn('Something went wrong.', error);
        });
    }

    onSendFormSuccess (data) {
        // TODO : Masquer le formulaire et afficher un message de succès dans le bloc notice
        console.log("Success !");
        console.log(data.data);
        this.setAlertMess(data.data, 'success');
    }

    onSendFormError (error) {
        // TODO : Ajouter l'erreur au bloc notice prévu à cet effet
        console.log("Une erreur s'est produite : ");
        console.log(error);
        this.setAlertMess(error, 'error');
    }

    setAlertMess (mess, type) {
        const divAlert = document.getElementById('div-alert');
        divAlert.style.display = "block";

        const divMess = document.createElement('div');
        divMess.setAttribute('class', 'alert-'+type);

        if(type === 'success') {
            divMess.innerHTML = '<span>&#x2714;<span> '+mess;
            this.clearFieldAccommodation();
        } else {
            divMess.innerHTML = '<span>&#x2716;</span> '+mess;
        }
        divAlert.appendChild(divMess);
        this.clearAlertMess();
    }

    clearFieldAccommodation () {
        document.getElementById('nom-hebergement').value = '';
        document.getElementById('adresse-hebergement').value = '';
        document.getElementById('complement-ad-hebergement').value = '';
        document.getElementById('code-postal-hebergement').value = '';
        document.getElementById('commune-hebergement').value = '';
        document.getElementById('tel-hebergement').value = '';
        document.getElementById('etage-hebergement').value = '';
        document.getElementById('type-hebergement').value = '';
        document.getElementById('capacite-hebergement').value = '';
        document.getElementById('nbpieces-hebergement').value = '';
        document.getElementById('nbchambre-hebergement').value = '';
        document.getElementById('classement-hebergement').value = '';
        document.getElementById('eligibilite-demandee').value = '';
        document.getElementById('surface-hebergement').value = '';
        document.getElementById('surface-ss-sdb-hebergement').value = '';
    }

    clearAlertMess () {
        setTimeout(function() {
            const divAlert = document.getElementById('div-alert');
            divAlert.style.display = "none";
            divAlert.innerText = "";
        }, 15000);
    }
}

const form = new ClasslocFormulaire("classloc-form");

window.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("click", (e) => {
        if(e.target.id == 'not-proprietaire'){
            var isHide = (document.getElementById(e.target.id).nextSibling.style.display === 'none') ? true : false;
            if(isHide) {
                document.getElementById(e.target.id).nextSibling.style.display = 'block';
                document.getElementById(e.target.id).textContent = "- Le demandeur est le propriétaire";
                document.getElementById("civilite-hebergeur").setAttribute('required', 'required');
                document.getElementById("email-hebergeur").setAttribute('required', 'required');
                document.getElementById("adresse-hebergeur").setAttribute('required', 'required');
                document.getElementById("code-postal-hebergeur").setAttribute('required', 'required');
                document.getElementById("commune-hebergeur").setAttribute('required', 'required');
                document.getElementById("pays-hebergeur").setAttribute('required', 'required');
            } else {
                document.getElementById(e.target.id).nextSibling.style.display = 'none';
                document.getElementById(e.target.id).textContent = "+ Coordonnées du propriétaire s'il n'est pas le demandeur";
                document.getElementById("civilite-hebergeur").removeAttribute('required');
                document.getElementById("email-hebergeur").removeAttribute('required');
                document.getElementById("adresse-hebergeur").removeAttribute('required');
                document.getElementById("code-postal-hebergeur").removeAttribute('required');
                document.getElementById("commune-hebergeur").removeAttribute('required');
                document.getElementById("pays-hebergeur").removeAttribute('required');
            }
        }
    });
});