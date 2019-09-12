var breedObj = {};
var editorObj = {};

// CKEditor 5 (User Description Inputs)
editorObj.loadEditor = function(){
    ClassicEditor
    .create( document.querySelector( '#description' ), {
        removePlugins: [ 'image', 'link', 'mediaEmbed', 'blockQuote' ],
        toolbar: [ 'heading', 'alignment', 'bold', 'italic', 'bulletedList', 'numberedList', 'undo', 'redo' ]
    }  )
    .then( editor => {
        console.log( editor );
    } )
    .catch( error => {
        console.error( error );
    } );
}

//Img upload preview handlers -------------------------------
//Displays the direction div and hides image div
//Used when no image is selected
breedObj.resetImg = function (){
    $("#ulDirections").css({"display":"block"})
    $("#ulPreview").css({"display":"none"})
}

// displays resized image and hides directions
breedObj.previewFiles = function() {
            
    var preview = document.getElementById('ulPreview');
    var files = document.querySelector('input[type=file]').files;
    
    function readAndPreview(file) {
        // Make sure file.name matches our extensions criteria
        // Get image ready for preview if it does
        if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
            var reader = new FileReader();
            reader.addEventListener("load", function() {
                var image = new Image();
                image.className= "ulprev";
                image.height = 200;
                image.width = 200;
                image.title = file.name;
                image.src = this.result;
                preview.appendChild( image );
            }, false);
            reader.readAsDataURL(file);
        }
    }

    // Hides directions and shows image preview, if theres a file ready
    if (files.length > 0) {
        $("#ulDirections").css({"display":"none"});
        $("#ulPreview").css({"display":"flex"});
        preview.innerHTML="<div id='ulPreviewOverlay'><span>Click here to reselect a cover photo. More photos can be added later.</span></div>";
        [].forEach.call(files, readAndPreview);
    }
}

// Breed dropdown, select2 config ----------------------------------
// onChange function, monitoring Species choices
breedObj.setSpecies = function(value){
    if (breedObj.initSpecies == false){
        breedObj.initSpecies = true;
        $(".multiple-limit").prop("disabled", false);
    }
    $('.multiple-limit').empty();
    $(".multiple-limit").select2({
        maximumSelectionLength: 3,
        dropdownParent: $('#breedselect'),
        placeholder: 'Choose up to 3 breeds.',
        data: breedObj[value]
    });
};

// init function, runs after page load --------------------------
$(document).ready(function() {
    //init to fill breed with preselcted breeds (edit page)
    if ($("#breedselect").hasClass("edit")){
        $(".multiple-limit").select2({
            maximumSelectionLength: 3,
            dropdownParent: $('#breedselect'),
            placeholder: 'Choose up to 3 breeds.',
            data: breedObj[$("#species").val()]
        });
        $('.multiple-limit').val($("#preselctedbreed").val().split(","));
        $('.multiple-limit').trigger('change');

        
        $("#ulDirections").css({"display":"none"})
        $("#ulPreview").css({"display":"flex"})

        $("#ulPreview").append("<img class='ulprev' src='"+$("#imgULUI").attr("value")+"'>")


    //init to have breed dropdown waiting (new pet page)
    } else {
        breedObj.initSpecies = false
        $(".multiple-limit").select2({
            maximumSelectionLength: 3,
            dropdownParent: $('#breedselect'),
            placeholder: 'Choose a species first.',
            data: breedObj.select
        });
        $(".multiple-limit").prop("disabled", true);
        }
    });

// Breed Lists ---------------------------------------------------
breedObj.select = [
    "Choose a species first."
]

breedObj.dog = [
    {
    "id" : "Abruzzenhund",
    "text":"Abruzzenhund"
    },
    {
    "id" : "Affenpinscher",
    "text":"Affenpinscher"
    },
    {
    "id" : "Afghan Hound",
    "text":"Afghan Hound"
    },
    {
    "id" : "Africanis",
    "text":"Africanis"
    },
    {
    "id" : "Aidi",
    "text":"Aidi"
    },
    {
    "id" : "Ainu Dog",
    "text":"Ainu Dog"
    },
    {
    "id" : "Airedale Terrier",
    "text":"Airedale Terrier"
    },
    {
    "id" : "Akbash Dog",
    "text":"Akbash Dog"
    },
    {
    "id" : "Akitas",
    "text":"Akitas"
    },
    {
    "id" : "Akita (American)",
    "text":"Akita (American)"
    },
    {
    "id" : "Akita Inu (Japanese)",
    "text":"Akita Inu (Japanese)"
    },
    {
    "id" : "Alano Español",
    "text":"Alano Español"
    },
    {
    "id" : "Alapaha Blue Blood Bulldog",
    "text":"Alapaha Blue Blood Bulldog"
    },
    {
    "id" : "Alaskan Husky",
    "text":"Alaskan Husky"
    },
    {
    "id" : "Alaskan Klee Kai",
    "text":"Alaskan Klee Kai"
    },
    {
    "id" : "Alaskan Malamute",
    "text":"Alaskan Malamute"
    },
    {
    "id" : "Alopekis",
    "text":"Alopekis"
    },
    {
    "id" : "Alpine Dachsbracke",
    "text":"Alpine Dachsbracke"
    },
    {
    "id" : "American Allaunt",
    "text":"American Allaunt"
    },
    {
    "id" : "American Alsatian",
    "text":"American Alsatian"
    },
    {
    "id" : "American Black and Tan Coonhound",
    "text":"American Black and Tan Coonhound"
    },
    {
    "id" : "American Blue Gascon Hound",
    "text":"American Blue Gascon Hound"
    },
    {
    "id" : "American Blue Lacy",
    "text":"American Blue Lacy"
    },
    {
    "id" : "American Bull Molosser",
    "text":"American Bull Molosser"
    },
    {
    "id" : "American Bulldog",
    "text":"American Bulldog"
    },
    {
    "id" : "American Bullnese",
    "text":"American Bullnese"
    },
    {
    "id" : "American Bully",
    "text":"American Bully"
    },
    {
    "id" : "American Cocker Spaniel",
    "text":"American Cocker Spaniel"
    },
    {
    "id" : "American Crested Sand Terrier",
    "text":"American Crested Sand Terrier"
    },
    {
    "id" : "American English Coonhound",
    "text":"American English Coonhound"
    },
    {
    "id" : "American Eskimo Dog",
    "text":"American Eskimo Dog"
    },
    {
    "id" : "American Foxhound",
    "text":"American Foxhound"
    },
    {
    "id" : "American Hairless Terrier",
    "text":"American Hairless Terrier"
    },
    {
    "id" : "American Indian Dog",
    "text":"American Indian Dog"
    },
    {
    "id" : "American Lo-Sze Pugg",
    "text":"American Lo-Sze Pugg"
    },
    {
    "id" : "American Mastiff",
    "text":"American Mastiff"
    },
    {
    "id" : "American Mastiff (Panja)",
    "text":"American Mastiff (Panja)"
    },
    {
    "id" : "American Pit Bull Terrier",
    "text":"American Pit Bull Terrier"
    },
    {
    "id" : "American Staffordshire Terrier",
    "text":"American Staffordshire Terrier"
    },
    {
    "id" : "American Staghound",
    "text":"American Staghound"
    },
    {
    "id" : "American Toy Terrier",
    "text":"American Toy Terrier"
    },
    {
    "id" : "American Tundra Shepherd Dog",
    "text":"American Tundra Shepherd Dog"
    },
    {
    "id" : "American Water Spaniel",
    "text":"American Water Spaniel"
    },
    {
    "id" : "American White Shepherd",
    "text":"American White Shepherd"
    },
    {
    "id" : "Anatolian Shepherd Dog",
    "text":"Anatolian Shepherd Dog"
    },
    {
    "id" : "Andalusian Podenco",
    "text":"Andalusian Podenco"
    },
    {
    "id" : "Anglo-Françaises",
    "text":"Anglo-Françaises"
    },
    {
    "id" : "Anglo-Françai Grand",
    "text":"Anglo-Françai Grand"
    },
    {
    "id" : "Anglo-Françaises de Moyenne Venerie",
    "text":"Anglo-Françaises de Moyenne Venerie"
    },
    {
    "id" : "Anglo-Françaises de Petite Venerie",
    "text":"Anglo-Françaises de Petite Venerie"
    },
    {
    "id" : "Appenzell Mountain Dog",
    "text":"Appenzell Mountain Dog"
    },
    {
    "id" : "Ariege Pointing Dog",
    "text":"Ariege Pointing Dog"
    },
    {
    "id" : "Ariegeois",
    "text":"Ariegeois"
    },
    {
    "id" : "Armant",
    "text":"Armant"
    },
    {
    "id" : "Aryan Molossus",
    "text":"Aryan Molossus"
    },
    {
    "id" : "Argentine Dogo",
    "text":"Argentine Dogo"
    },
    {
    "id" : "Armenian Gampr",
    "text":"Armenian Gampr"
    },
    {
    "id" : "Atlas Terrier",
    "text":"Atlas Terrier"
    },
    {
    "id" : "Australian Bandog",
    "text":"Australian Bandog"
    },
    {
    "id" : "Australian Bulldog",
    "text":"Australian Bulldog"
    },
    {
    "id" : "Australian Cattle Dog",
    "text":"Australian Cattle Dog"
    },
    {
    "id" : "Australian Cobberdog",
    "text":"Australian Cobberdog"
    },
    {
    "id" : "Australian Kelpie",
    "text":"Australian Kelpie"
    },
    {
    "id" : "Australian Koolie",
    "text":"Australian Koolie"
    },
    {
    "id" : "Australian Labradoodle",
    "text":"Australian Labradoodle"
    },
    {
    "id" : "Australian Shepherd",
    "text":"Australian Shepherd"
    },
    {
    "id" : "Australian Stumpy Tail Cattle Dog",
    "text":"Australian Stumpy Tail Cattle Dog"
    },
    {
    "id" : "Australian Terrier",
    "text":"Australian Terrier"
    },
    {
    "id" : "Austrian Black and Tan Hound",
    "text":"Austrian Black and Tan Hound"
    },
    {
    "id" : "Austrian Brandlbracke",
    "text":"Austrian Brandlbracke"
    },
    {
    "id" : "Austrian Shorthaired Pinscher",
    "text":"Austrian Shorthaired Pinscher"
    },
    {
    "id" : "Auvergne Pointing Dog",
    "text":"Auvergne Pointing Dog"
    },
    {
    "id" : "Azawakh",
    "text":"Azawakh"
    },
    {
    "id" : "Balkan Hound",
    "text":"Balkan Hound"
    },
    {
    "id" : "Balkan Scenthound",
    "text":"Balkan Scenthound"
    },
    {
    "id" : "Balkanski Gonic",
    "text":"Balkanski Gonic"
    },
    {
    "id" : "Banjara Greyhound",
    "text":"Banjara Greyhound"
    },
    {
    "id" : "Banter Bulldogge",
    "text":"Banter Bulldogge"
    },
    {
    "id" : "Barbet",
    "text":"Barbet"
    },
    {
    "id" : "Basenji",
    "text":"Basenji"
    },
    {
    "id" : "Basset Artesien Normand",
    "text":"Basset Artesien Normand"
    },
    {
    "id" : "Basset Bleu de Gascogne",
    "text":"Basset Bleu de Gascogne"
    },
    {
    "id" : "Basset Fauve de Bretagne",
    "text":"Basset Fauve de Bretagne"
    },
    {
    "id" : "Basset Hound",
    "text":"Basset Hound"
    },
    {
    "id" : "Bavarian Mountain Hound",
    "text":"Bavarian Mountain Hound"
    },
    {
    "id" : "Beagle",
    "text":"Beagle"
    },
    {
    "id" : "Beagle Harrier",
    "text":"Beagle Harrier"
    },
    {
    "id" : "Bearded Collie",
    "text":"Bearded Collie"
    },
    {
    "id" : "Beauceron",
    "text":"Beauceron"
    },
    {
    "id" : "Bedlington Terrier",
    "text":"Bedlington Terrier"
    },
    {
    "id" : "Bedouin Shepherd Dog",
    "text":"Bedouin Shepherd Dog"
    },
    {
    "id" : "Belgian Griffons",
    "text":"Belgian Griffons"
    },
    {
    "id" : "Belgian Mastiff",
    "text":"Belgian Mastiff"
    },
    {
    "id" : "Belgian Shepherd Groenendael",
    "text":"Belgian Shepherd Groenendael"
    },
    {
    "id" : "Belgian Shepherd Laekenois",
    "text":"Belgian Shepherd Laekenois"
    },
    {
    "id" : "Belgian Shepherd Malinois",
    "text":"Belgian Shepherd Malinois"
    },
    {
    "id" : "Belgian Shepherd Tervuren",
    "text":"Belgian Shepherd Tervuren"
    },
    {
    "id" : "Belgian Shorthaired Pointer",
    "text":"Belgian Shorthaired Pointer"
    },
    {
    "id" : "Belgrade Terrier",
    "text":"Belgrade Terrier"
    },
    {
    "id" : "Bench-legged Feist",
    "text":"Bench-legged Feist"
    },
    {
    "id" : "Bergamasco",
    "text":"Bergamasco"
    },
    {
    "id" : "Berger Blanc Suisse",
    "text":"Berger Blanc Suisse"
    },
    {
    "id" : "Berger des Picard",
    "text":"Berger des Picard"
    },
    {
    "id" : "Berger des Pyrénées",
    "text":"Berger des Pyrénées"
    },
    {
    "id" : "Berger Du Languedoc",
    "text":"Berger Du Languedoc"
    },
    {
    "id" : "Bernese Hound",
    "text":"Bernese Hound"
    },
    {
    "id" : "Bernese Mountain Dog",
    "text":"Bernese Mountain Dog"
    },
    {
    "id" : "Bhagyari Kutta",
    "text":"Bhagyari Kutta"
    },
    {
    "id" : "Bichon Frise",
    "text":"Bichon Frise"
    },
    {
    "id" : "Bichon Havanais",
    "text":"Bichon Havanais"
    },
    {
    "id" : "Biewer",
    "text":"Biewer"
    },
    {
    "id" : "Billy",
    "text":"Billy"
    },
    {
    "id" : "Biro",
    "text":"Biro"
    },
    {
    "id" : "Black and Tan Coonhound",
    "text":"Black and Tan Coonhound"
    },
    {
    "id" : "Black Forest Hound",
    "text":"Black Forest Hound"
    },
    {
    "id" : "Black Mouth Cur",
    "text":"Black Mouth Cur"
    },
    {
    "id" : "Black Norwegian Elkhound",
    "text":"Black Norwegian Elkhound"
    },
    {
    "id" : "Black Russian Terrier",
    "text":"Black Russian Terrier"
    },
    {
    "id" : "Bleus de Gascogne",
    "text":"Bleus de Gascogne"
    },
    {
    "id" : "Bloodhound",
    "text":"Bloodhound"
    },
    {
    "id" : "Blue Gascony Basset",
    "text":"Blue Gascony Basset"
    },
    {
    "id" : "Blue Heeler",
    "text":"Blue Heeler"
    },
    {
    "id" : "Blue Lacy",
    "text":"Blue Lacy"
    },
    {
    "id" : "Blue Picardy Spaniel",
    "text":"Blue Picardy Spaniel"
    },
    {
    "id" : "Bluetick Coonhound",
    "text":"Bluetick Coonhound"
    },
    {
    "id" : "Boerboel",
    "text":"Boerboel"
    },
    {
    "id" : "Bohemian Shepherd",
    "text":"Bohemian Shepherd"
    },
    {
    "id" : "Bohemian Terrier",
    "text":"Bohemian Terrier"
    },
    {
    "id" : "Bolognese",
    "text":"Bolognese"
    },
    {
    "id" : "Bonsai Bulldogge",
    "text":"Bonsai Bulldogge"
    },
    {
    "id" : "Border Collie",
    "text":"Border Collie"
    },
    {
    "id" : "Border Terrier",
    "text":"Border Terrier"
    },
    {
    "id" : "Borzoi",
    "text":"Borzoi"
    },
    {
    "id" : "Bosanski Ostrodlaki Gonic Barak",
    "text":"Bosanski Ostrodlaki Gonic Barak"
    },
    {
    "id" : "Bosnian-Herzegovinian Sheepdog - Tornjak",
    "text":"Bosnian-Herzegovinian Sheepdog - Tornjak"
    },
    {
    "id" : "Boston Terrier",
    "text":"Boston Terrier"
    },
    {
    "id" : "Bouvier de Ardennes",
    "text":"Bouvier de Ardennes"
    },
    {
    "id" : "Bouvier des Flandres",
    "text":"Bouvier des Flandres"
    },
    {
    "id" : "Boxer",
    "text":"Boxer"
    },
    {
    "id" : "Boykin Spaniel",
    "text":"Boykin Spaniel"
    },
    {
    "id" : "Bracco Italiano",
    "text":"Bracco Italiano"
    },
    {
    "id" : "Braque du Bourbonnais",
    "text":"Braque du Bourbonnais"
    },
    {
    "id" : "Braque Dupuy",
    "text":"Braque Dupuy"
    },
    {
    "id" : "Braque Francais",
    "text":"Braque Francais"
    },
    {
    "id" : "Brazilian Terrier",
    "text":"Brazilian Terrier"
    },
    {
    "id" : "Briard",
    "text":"Briard"
    },
    {
    "id" : "Brittany Spaniel",
    "text":"Brittany Spaniel"
    },
    {
    "id" : "Briquet",
    "text":"Briquet"
    },
    {
    "id" : "Briquet Griffon Vendeen",
    "text":"Briquet Griffon Vendeen"
    },
    {
    "id" : "Broholmer",
    "text":"Broholmer"
    },
    {
    "id" : "Brussels Griffon",
    "text":"Brussels Griffon"
    },
    {
    "id" : "Bukovina Sheepdog",
    "text":"Bukovina Sheepdog"
    },
    {
    "id" : "Buldogue Campeiro",
    "text":"Buldogue Campeiro"
    },
    {
    "id" : "Bull Terrier",
    "text":"Bull Terrier"
    },
    {
    "id" : "Bully Kutta",
    "text":"Bully Kutta"
    },
    {
    "id" : "Bulldog",
    "text":"Bulldog"
    },
    {
    "id" : "Bullmastiff",
    "text":"Bullmastiff"
    },
    {
    "id" : "Cairn Terrier",
    "text":"Cairn Terrier"
    },
    {
    "id" : "Cajun Squirrel Dog",
    "text":"Cajun Squirrel Dog"
    },
    {
    "id" : "Cambodian Razorback Dog",
    "text":"Cambodian Razorback Dog"
    },
    {
    "id" : "Canaan Dog",
    "text":"Canaan Dog"
    },
    {
    "id" : "Canadian Eskimo Dog",
    "text":"Canadian Eskimo Dog"
    },
    {
    "id" : "Canadian Inuit Dog",
    "text":"Canadian Inuit Dog"
    },
    {
    "id" : "Canary Dog",
    "text":"Canary Dog"
    },
    {
    "id" : "Canarian Warren Hound",
    "text":"Canarian Warren Hound"
    },
    {
    "id" : "Cane Corso Italiano",
    "text":"Cane Corso Italiano"
    },
    {
    "id" : "Canis Panther",
    "text":"Canis Panther"
    },
    {
    "id" : "Canoe Dog",
    "text":"Canoe Dog"
    },
    {
    "id" : "Cão da Serra da Estrela",
    "text":"Cão da Serra da Estrela"
    },
    {
    "id" : "Cão da Serra de Aires",
    "text":"Cão da Serra de Aires"
    },
    {
    "id" : "Cão de Castro Laboreiro",
    "text":"Cão de Castro Laboreiro"
    },
    {
    "id" : "Cão de Fila de São Miguel",
    "text":"Cão de Fila de São Miguel"
    },
    {
    "id" : "Cão de Gado Transmontano",
    "text":"Cão de Gado Transmontano"
    },
    {
    "id" : "Caravan Hound",
    "text":"Caravan Hound"
    },
    {
    "id" : "Carlin Pinscher",
    "text":"Carlin Pinscher"
    },
    {
    "id" : "Carolina Dog",
    "text":"Carolina Dog"
    },
    {
    "id" : "Carpathian Sheepdog",
    "text":"Carpathian Sheepdog"
    },
    {
    "id" : "Catahoula Leopard Dog",
    "text":"Catahoula Leopard Dog"
    },
    {
    "id" : "Catalan Sheepdog",
    "text":"Catalan Sheepdog"
    },
    {
    "id" : "Cardigan Welsh Corgi",
    "text":"Cardigan Welsh Corgi"
    },
    {
    "id" : "Caucasian Ovtcharka",
    "text":"Caucasian Ovtcharka"
    },
    {
    "id" : "Cavalier King Charles Spaniel",
    "text":"Cavalier King Charles Spaniel"
    },
    {
    "id" : "Central Asian Ovtcharka",
    "text":"Central Asian Ovtcharka"
    },
    {
    "id" : "Cesky Fousek",
    "text":"Cesky Fousek"
    },
    {
    "id" : "Cesky Terrier",
    "text":"Cesky Terrier"
    },
    {
    "id" : "Chart Polski",
    "text":"Chart Polski"
    },
    {
    "id" : "Chesapeake Bay Retriever",
    "text":"Chesapeake Bay Retriever"
    },
    {
    "id" : "Chien D'Artois",
    "text":"Chien D'Artois"
    },
    {
    "id" : "Chien De L' Atlas",
    "text":"Chien De L' Atlas"
    },
    {
    "id" : "Chien Française",
    "text":"Chien Française"
    },
    {
    "id" : "Chihuahua",
    "text":"Chihuahua"
    },
    {
    "id" : "Chin",
    "text":"Chin"
    },
    {
    "id" : "Chinese Chongqing Dog",
    "text":"Chinese Chongqing Dog"
    },
    {
    "id" : "Chinese Crested",
    "text":"Chinese Crested"
    },
    {
    "id" : "Chinese Foo Dog",
    "text":"Chinese Foo Dog"
    },
    {
    "id" : "Chinese Imperial Dog",
    "text":"Chinese Imperial Dog"
    },
    {
    "id" : "Chinese Shar-Pei",
    "text":"Chinese Shar-Pei"
    },
    {
    "id" : "Chinook",
    "text":"Chinook"
    },
    {
    "id" : "Chippiparai",
    "text":"Chippiparai"
    },
    {
    "id" : "Chiribaya Shepherd",
    "text":"Chiribaya Shepherd"
    },
    {
    "id" : "Chortaj",
    "text":"Chortaj"
    },
    {
    "id" : "Chow Chow",
    "text":"Chow Chow"
    },
    {
    "id" : "Cierny Sery",
    "text":"Cierny Sery"
    },
    {
    "id" : "Cimarron Uruguayo",
    "text":"Cimarron Uruguayo"
    },
    {
    "id" : "Cirneco Dell'Etna",
    "text":"Cirneco Dell'Etna"
    },
    {
    "id" : "Clumber Spaniel",
    "text":"Clumber Spaniel"
    },
    {
    "id" : "Cocker Spaniel",
    "text":"Cocker Spaniel"
    },
    {
    "id" : "Collie (Rough and Smooth)",
    "text":"Collie (Rough and Smooth)"
    },
    {
    "id" : "Combai",
    "text":"Combai"
    },
    {
    "id" : "Continental Bulldog",
    "text":"Continental Bulldog"
    },
    {
    "id" : "Continental Toy Spaniel",
    "text":"Continental Toy Spaniel"
    },
    {
    "id" : "Coochi",
    "text":"Coochi"
    },
    {
    "id" : "Corgi",
    "text":"Corgi"
    },
    {
    "id" : "Coton de Tulear",
    "text":"Coton de Tulear"
    },
    {
    "id" : "Cretan Hound",
    "text":"Cretan Hound"
    },
    {
    "id" : "Croatian Sheepdog",
    "text":"Croatian Sheepdog"
    },
    {
    "id" : "Curly-Coated Retriever",
    "text":"Curly-Coated Retriever"
    },
    {
    "id" : "Cypro Kukur",
    "text":"Cypro Kukur"
    },
    {
    "id" : "Czechoslovakian Wolfdog",
    "text":"Czechoslovakian Wolfdog"
    },
    {
    "id" : "Czesky Terrier",
    "text":"Czesky Terrier"
    },
    {
    "id" : "Dachshund",
    "text":"Dachshund"
    },
    {
    "id" : "Dakotah Shepherd",
    "text":"Dakotah Shepherd"
    },
    {
    "id" : "Dalmatian",
    "text":"Dalmatian"
    },
    {
    "id" : "Dandie Dinmont Terrier",
    "text":"Dandie Dinmont Terrier"
    },
    {
    "id" : "Danish Broholmer",
    "text":"Danish Broholmer"
    },
    {
    "id" : "Danish-Swedish Farmdog",
    "text":"Danish-Swedish Farmdog"
    },
    {
    "id" : "Denmark Feist",
    "text":"Denmark Feist"
    },
    {
    "id" : "Deutsche Bracke (see photo needed)",
    "text":"Deutsche Bracke (see photo needed)"
    },
    {
    "id" : "Deutsch Drahthaar",
    "text":"Deutsch Drahthaar"
    },
    {
    "id" : "Deutscher Wachtelhund",
    "text":"Deutscher Wachtelhund"
    },
    {
    "id" : "Dingo",
    "text":"Dingo"
    },
    {
    "id" : "Doberman Pinscher",
    "text":"Doberman Pinscher"
    },
    {
    "id" : "Dogo Argentino",
    "text":"Dogo Argentino"
    },
    {
    "id" : "Dogue de Bordeaux",
    "text":"Dogue de Bordeaux"
    },
    {
    "id" : "Dorset Olde Tyme Bulldogge",
    "text":"Dorset Olde Tyme Bulldogge"
    },
    {
    "id" : "Drentse Patrijshond",
    "text":"Drentse Patrijshond"
    },
    {
    "id" : "Drever",
    "text":"Drever"
    },
    {
    "id" : "Dunker",
    "text":"Dunker"
    },
    {
    "id" : "Dutch Shepherd Dog",
    "text":"Dutch Shepherd Dog"
    },
    {
    "id" : "Dutch Smoushond",
    "text":"Dutch Smoushond"
    },
    {
    "id" : "East-European Shepherd",
    "text":"East-European Shepherd"
    },
    {
    "id" : "East Russian Coursing Hound",
    "text":"East Russian Coursing Hound"
    },
    {
    "id" : "East Siberian Laika",
    "text":"East Siberian Laika"
    },
    {
    "id" : "Elkhound (see Norwegian Elkhound)",
    "text":"Elkhound (see Norwegian Elkhound)"
    },
    {
    "id" : "English Bulldog",
    "text":"English Bulldog"
    },
    {
    "id" : "English Bullen Bordeaux Terrier",
    "text":"English Bullen Bordeaux Terrier"
    },
    {
    "id" : "English Cocker Spaniel",
    "text":"English Cocker Spaniel"
    },
    {
    "id" : "English Coonhound",
    "text":"English Coonhound"
    },
    {
    "id" : "English Foxhound",
    "text":"English Foxhound"
    },
    {
    "id" : "English Pointer",
    "text":"English Pointer"
    },
    {
    "id" : "English Setter",
    "text":"English Setter"
    },
    {
    "id" : "English Shepherd",
    "text":"English Shepherd"
    },
    {
    "id" : "English Springer Spaniel",
    "text":"English Springer Spaniel"
    },
    {
    "id" : "English Toy Spaniel",
    "text":"English Toy Spaniel"
    },
    {
    "id" : "Entlebucher Sennenhund",
    "text":"Entlebucher Sennenhund"
    },
    {
    "id" : "Estonian Hound",
    "text":"Estonian Hound"
    },
    {
    "id" : "Estrela Mountain Dog",
    "text":"Estrela Mountain Dog"
    },
    {
    "id" : "Eurasier",
    "text":"Eurasier"
    },
    {
    "id" : "Farm Collie",
    "text":"Farm Collie"
    },
    {
    "id" : "Fauve de Bretagne",
    "text":"Fauve de Bretagne"
    },
    {
    "id" : "Feist",
    "text":"Feist"
    },
    {
    "id" : "Field Spaniel",
    "text":"Field Spaniel"
    },
    {
    "id" : "Fila Brasileiro",
    "text":"Fila Brasileiro"
    },
    {
    "id" : "Finnish Hound",
    "text":"Finnish Hound"
    },
    {
    "id" : "Finnish Lapphund",
    "text":"Finnish Lapphund"
    },
    {
    "id" : "Finnish Spitz",
    "text":"Finnish Spitz"
    },
    {
    "id" : "Flat-Coated Retriever",
    "text":"Flat-Coated Retriever"
    },
    {
    "id" : "Foxhound",
    "text":"Foxhound"
    },
    {
    "id" : "Fox Terrier",
    "text":"Fox Terrier"
    },
    {
    "id" : "French Brittany Spaniel",
    "text":"French Brittany Spaniel"
    },
    {
    "id" : "French Bulldog",
    "text":"French Bulldog"
    },
    {
    "id" : "French Mastiff",
    "text":"French Mastiff"
    },
    {
    "id" : "French Pointing Dog",
    "text":"French Pointing Dog"
    },
    {
    "id" : "French Spaniel",
    "text":"French Spaniel"
    },
    {
    "id" : "French Tricolor Hound",
    "text":"French Tricolor Hound"
    },
    {
    "id" : "French White and Black Hound",
    "text":"French White and Black Hound"
    },
    {
    "id" : "French White and Orange Hound",
    "text":"French White and Orange Hound"
    },
    {
    "id" : "Galgo Español",
    "text":"Galgo Español"
    },
    {
    "id" : "Gammel Dansk Hoensehund",
    "text":"Gammel Dansk Hoensehund"
    },
    {
    "id" : "Gascons-Saintongeois",
    "text":"Gascons-Saintongeois"
    },
    {
    "id" : "Georgian Shepherd",
    "text":"Georgian Shepherd"
    },
    {
    "id" : "Georgian Mountain Dog",
    "text":"Georgian Mountain Dog"
    },
    {
    "id" : "German Hunt Terrier",
    "text":"German Hunt Terrier"
    },
    {
    "id" : "German Longhaired Pointer",
    "text":"German Longhaired Pointer"
    },
    {
    "id" : "German Rough-haired Pointing Dog",
    "text":"German Rough-haired Pointing Dog"
    },
    {
    "id" : "German Pinscher",
    "text":"German Pinscher"
    },
    {
    "id" : "German Sheeppoodle",
    "text":"German Sheeppoodle"
    },
    {
    "id" : "German Shepherd Dog",
    "text":"German Shepherd Dog"
    },
    {
    "id" : "German Shorthaired Pointer",
    "text":"German Shorthaired Pointer"
    },
    {
    "id" : "German Spitz",
    "text":"German Spitz"
    },
    {
    "id" : "German Spitz Giant",
    "text":"German Spitz Giant"
    },
    {
    "id" : "German Spitz Medium",
    "text":"German Spitz Medium"
    },
    {
    "id" : "German Spitz Small",
    "text":"German Spitz Small"
    },
    {
    "id" : "German Wirehaired Pointer",
    "text":"German Wirehaired Pointer"
    },
    {
    "id" : "Giant Maso Mastiff",
    "text":"Giant Maso Mastiff"
    },
    {
    "id" : "Giant Schnauzer",
    "text":"Giant Schnauzer"
    },
    {
    "id" : "Glen of Imaal Terrier",
    "text":"Glen of Imaal Terrier"
    },
    {
    "id" : "Golddust Yorkshire Terrier",
    "text":"Golddust Yorkshire Terrier"
    },
    {
    "id" : "Golden Retriever",
    "text":"Golden Retriever"
    },
    {
    "id" : "Gordon Setter",
    "text":"Gordon Setter"
    },
    {
    "id" : "Gran Mastin de Borinquen",
    "text":"Gran Mastin de Borinquen"
    },
    {
    "id" : "Grand Anglo-Français",
    "text":"Grand Anglo-Français"
    },
    {
    "id" : "Grand Anglo-Français Tricolore",
    "text":"Grand Anglo-Français Tricolore"
    },
    {
    "id" : "Grand Anglo-Français Blanc et Noir",
    "text":"Grand Anglo-Français Blanc et Noir"
    },
    {
    "id" : "Grand Anglo-Français Blanc et Orange",
    "text":"Grand Anglo-Français Blanc et Orange"
    },
    {
    "id" : "Grand Basset Griffon Vendeen",
    "text":"Grand Basset Griffon Vendeen"
    },
    {
    "id" : "Grand Bleu de Gascogne",
    "text":"Grand Bleu de Gascogne"
    },
    {
    "id" : "Grand Gascon Saintongeois",
    "text":"Grand Gascon Saintongeois"
    },
    {
    "id" : "Grand Griffon Vendeen",
    "text":"Grand Griffon Vendeen"
    },
    {
    "id" : "Great Dane",
    "text":"Great Dane"
    },
    {
    "id" : "Great Pyrenees",
    "text":"Great Pyrenees"
    },
    {
    "id" : "Greater Swiss Mountain Dog",
    "text":"Greater Swiss Mountain Dog"
    },
    {
    "id" : "Greek Hound",
    "text":"Greek Hound"
    },
    {
    "id" : "Greek Sheepdog",
    "text":"Greek Sheepdog"
    },
    {
    "id" : "Greenland Dog",
    "text":"Greenland Dog"
    },
    {
    "id" : "Greyhound",
    "text":"Greyhound"
    },
    {
    "id" : "Griffon Bleu de Gascogne",
    "text":"Griffon Bleu de Gascogne"
    },
    {
    "id" : "Griffon Fauve de Bretagne",
    "text":"Griffon Fauve de Bretagne"
    },
    {
    "id" : "Griffon Nivernais",
    "text":"Griffon Nivernais"
    },
    {
    "id" : "Groenendael",
    "text":"Groenendael"
    },
    {
    "id" : "Grosser Münsterlander Vorstehhund",
    "text":"Grosser Münsterlander Vorstehhund"
    },
    {
    "id" : "Guatemalan Bull Terrier",
    "text":"Guatemalan Bull Terrier"
    },
    {
    "id" : "Hairless Khala",
    "text":"Hairless Khala"
    },
    {
    "id" : "Halden Hound",
    "text":"Halden Hound"
    },
    {
    "id" : "Hamilton Hound",
    "text":"Hamilton Hound"
    },
    {
    "id" : "Hanoverian Hound",
    "text":"Hanoverian Hound"
    },
    {
    "id" : "Harlequin Pinscher",
    "text":"Harlequin Pinscher"
    },
    {
    "id" : "Harrier",
    "text":"Harrier"
    },
    {
    "id" : "Havanese",
    "text":"Havanese"
    },
    {
    "id" : "Hawaiian Poi Dog",
    "text":"Hawaiian Poi Dog"
    },
    {
    "id" : "Hellenikos Ichnilatis",
    "text":"Hellenikos Ichnilatis"
    },
    {
    "id" : "Hellenikos Poimenikos (see Greek Sheepdog)",
    "text":"Hellenikos Poimenikos (see Greek Sheepdog)"
    },
    {
    "id" : "Hertha Pointer",
    "text":"Hertha Pointer"
    },
    {
    "id" : "Himalayan Sheepdog",
    "text":"Himalayan Sheepdog"
    },
    {
    "id" : "Hokkaido Dog",
    "text":"Hokkaido Dog"
    },
    {
    "id" : "Hanoverian Scenthound",
    "text":"Hanoverian Scenthound"
    },
    {
    "id" : "Hovawart",
    "text":"Hovawart"
    },
    {
    "id" : "Hungarian Greyhound (see Magyar Agar)",
    "text":"Hungarian Greyhound (see Magyar Agar)"
    },
    {
    "id" : "Hungarian Kuvasz",
    "text":"Hungarian Kuvasz"
    },
    {
    "id" : "Hungarian Puli",
    "text":"Hungarian Puli"
    },
    {
    "id" : "Hungarian Wire-haired Pointing Dog",
    "text":"Hungarian Wire-haired Pointing Dog"
    },
    {
    "id" : "Husky",
    "text":"Husky"
    },
    {
    "id" : "Hygenhund",
    "text":"Hygenhund"
    },
    {
    "id" : "Ibizan Hound",
    "text":"Ibizan Hound"
    },
    {
    "id" : "Icelandic Sheepdog",
    "text":"Icelandic Sheepdog"
    },
    {
    "id" : "Inca Hairless Dog",
    "text":"Inca Hairless Dog"
    },
    {
    "id" : "Indian Spitz",
    "text":"Indian Spitz"
    },
    {
    "id" : "Irish Glen Imaal Terrier",
    "text":"Irish Glen Imaal Terrier"
    },
    {
    "id" : "Irish Red and White Setter",
    "text":"Irish Red and White Setter"
    },
    {
    "id" : "Irish Setter",
    "text":"Irish Setter"
    },
    {
    "id" : "Irish Staffordshire Bull Terrier",
    "text":"Irish Staffordshire Bull Terrier"
    },
    {
    "id" : "Irish Terrier",
    "text":"Irish Terrier"
    },
    {
    "id" : "Irish Water Spaniel",
    "text":"Irish Water Spaniel"
    },
    {
    "id" : "Irish Wolfhound",
    "text":"Irish Wolfhound"
    },
    {
    "id" : "Istrian Coarse-haired Hound (Photo Needed)",
    "text":"Istrian Coarse-haired Hound (Photo Needed)"
    },
    {
    "id" : "Istrian Shorthaired Hound",
    "text":"Istrian Shorthaired Hound"
    },
    {
    "id" : "Italian Greyhound",
    "text":"Italian Greyhound"
    },
    {
    "id" : "Italian Hound",
    "text":"Italian Hound"
    },
    {
    "id" : "Italian Spinoni",
    "text":"Italian Spinoni"
    },
    {
    "id" : "Jack Russell Terrier",
    "text":"Jack Russell Terrier"
    },
    {
    "id" : "Jamthund",
    "text":"Jamthund"
    },
    {
    "id" : "Japanese Spaniel (Chin)",
    "text":"Japanese Spaniel (Chin)"
    },
    {
    "id" : "Japanese Spitz",
    "text":"Japanese Spitz"
    },
    {
    "id" : "Japanese Terrier",
    "text":"Japanese Terrier"
    },
    {
    "id" : "Jindo",
    "text":"Jindo"
    },
    {
    "id" : "Kai Dog",
    "text":"Kai Dog"
    },
    {
    "id" : "Kangal Dog",
    "text":"Kangal Dog"
    },
    {
    "id" : "Kangaroo Dog",
    "text":"Kangaroo Dog"
    },
    {
    "id" : "Kanni",
    "text":"Kanni"
    },
    {
    "id" : "Karabash",
    "text":"Karabash"
    },
    {
    "id" : "Karakachan",
    "text":"Karakachan"
    },
    {
    "id" : "Karelian Bear Dog",
    "text":"Karelian Bear Dog"
    },
    {
    "id" : "Karelian Bear Laika",
    "text":"Karelian Bear Laika"
    },
    {
    "id" : "Karelo-Finnish Laika",
    "text":"Karelo-Finnish Laika"
    },
    {
    "id" : "Karst Shepherd",
    "text":"Karst Shepherd"
    },
    {
    "id" : "Kattai Nai",
    "text":"Kattai Nai"
    },
    {
    "id" : "Keeshond",
    "text":"Keeshond"
    },
    {
    "id" : "Kelb Tal-Fenek",
    "text":"Kelb Tal-Fenek"
    },
    {
    "id" : "Kemmer Feist",
    "text":"Kemmer Feist"
    },
    {
    "id" : "Kerry Beagle",
    "text":"Kerry Beagle"
    },
    {
    "id" : "Kerry Blue Terrier",
    "text":"Kerry Blue Terrier"
    },
    {
    "id" : "King Charles Spaniel",
    "text":"King Charles Spaniel"
    },
    {
    "id" : "King Shepherd",
    "text":"King Shepherd"
    },
    {
    "id" : "Kishu Ken",
    "text":"Kishu Ken"
    },
    {
    "id" : "Klein Poodle",
    "text":"Klein Poodle"
    },
    {
    "id" : "Kokoni",
    "text":"Kokoni"
    },
    {
    "id" : "Komondor",
    "text":"Komondor"
    },
    {
    "id" : "Koochee",
    "text":"Koochee"
    },
    {
    "id" : "Kooikerhondje",
    "text":"Kooikerhondje"
    },
    {
    "id" : "Koolie",
    "text":"Koolie"
    },
    {
    "id" : "Korean Dosa Mastiff",
    "text":"Korean Dosa Mastiff"
    },
    {
    "id" : "Krasky Ovcar",
    "text":"Krasky Ovcar"
    },
    {
    "id" : "Kromfohrlander",
    "text":"Kromfohrlander"
    },
    {
    "id" : "Kuchi",
    "text":"Kuchi"
    },
    {
    "id" : "Kugsha Dog",
    "text":"Kugsha Dog"
    },
    {
    "id" : "Kunming Dog",
    "text":"Kunming Dog"
    },
    {
    "id" : "Kuvasz",
    "text":"Kuvasz"
    },
    {
    "id" : "Kyi-Leo®",
    "text":"Kyi-Leo®"
    },
    {
    "id" : "Labrador Husky",
    "text":"Labrador Husky"
    },
    {
    "id" : "Labrador Retriever",
    "text":"Labrador Retriever"
    },
    {
    "id" : "Lagotto Romagnolo",
    "text":"Lagotto Romagnolo"
    },
    {
    "id" : "Lakeland Terrier",
    "text":"Lakeland Terrier"
    },
    {
    "id" : "Lakota Mastino",
    "text":"Lakota Mastino"
    },
    {
    "id" : "Lancashire Heeler",
    "text":"Lancashire Heeler"
    },
    {
    "id" : "Landseer",
    "text":"Landseer"
    },
    {
    "id" : "Lapinporokoira",
    "text":"Lapinporokoira"
    },
    {
    "id" : "Lapphunds",
    "text":"Lapphunds"
    },
    {
    "id" : "Large Münsterländer",
    "text":"Large Münsterländer"
    },
    {
    "id" : "Larson Lakeview Bulldogge",
    "text":"Larson Lakeview Bulldogge"
    },
    {
    "id" : "Latvian Hound",
    "text":"Latvian Hound"
    },
    {
    "id" : "Leavitt Bulldog",
    "text":"Leavitt Bulldog"
    },
    {
    "id" : "Leonberger",
    "text":"Leonberger"
    },
    {
    "id" : "Levesque",
    "text":"Levesque"
    },
    {
    "id" : "Lhasa Apso",
    "text":"Lhasa Apso"
    },
    {
    "id" : "Lithuanian Hound",
    "text":"Lithuanian Hound"
    },
    {
    "id" : "Llewellin Setter",
    "text":"Llewellin Setter"
    },
    {
    "id" : "Longhaired Whippet",
    "text":"Longhaired Whippet"
    },
    {
    "id" : "Louisiana Catahoula Leopard Dog",
    "text":"Louisiana Catahoula Leopard Dog"
    },
    {
    "id" : "Löwchen (Little Lion Dog)",
    "text":"Löwchen (Little Lion Dog)"
    },
    {
    "id" : "Lucas Terrier",
    "text":"Lucas Terrier"
    },
    {
    "id" : "Lundehund",
    "text":"Lundehund"
    },
    {
    "id" : "Magyar Agar",
    "text":"Magyar Agar"
    },
    {
    "id" : "Mahratta Greyhound",
    "text":"Mahratta Greyhound"
    },
    {
    "id" : "Majestic Tree Hound",
    "text":"Majestic Tree Hound"
    },
    {
    "id" : "Majorca Shepherd Dog",
    "text":"Majorca Shepherd Dog"
    },
    {
    "id" : "Maltese",
    "text":"Maltese"
    },
    {
    "id" : "Mammut Bulldog",
    "text":"Mammut Bulldog"
    },
    {
    "id" : "Manchester Terrier",
    "text":"Manchester Terrier"
    },
    {
    "id" : "Mandai Sheephound",
    "text":"Mandai Sheephound"
    },
    {
    "id" : "Maremma Sheepdog",
    "text":"Maremma Sheepdog"
    },
    {
    "id" : "Markiesje",
    "text":"Markiesje"
    },
    {
    "id" : "Mastiff",
    "text":"Mastiff"
    },
    {
    "id" : "McNab",
    "text":"McNab"
    },
    {
    "id" : "Mexican Hairless",
    "text":"Mexican Hairless"
    },
    {
    "id" : "Mi-Ki",
    "text":"Mi-Ki"
    },
    {
    "id" : "Middle Asian Ovtcharka",
    "text":"Middle Asian Ovtcharka"
    },
    {
    "id" : "Miniature American Eskimo",
    "text":"Miniature American Eskimo"
    },
    {
    "id" : "Miniature Australian Bulldog",
    "text":"Miniature Australian Bulldog"
    },
    {
    "id" : "Miniature Australian Shepherd",
    "text":"Miniature Australian Shepherd"
    },
    {
    "id" : "Miniature Bull Terrier",
    "text":"Miniature Bull Terrier"
    },
    {
    "id" : "Miniature Fox Terrier",
    "text":"Miniature Fox Terrier"
    },
    {
    "id" : "Miniature Pinscher",
    "text":"Miniature Pinscher"
    },
    {
    "id" : "Miniature Poodle",
    "text":"Miniature Poodle"
    },
    {
    "id" : "Miniature Schnauzer",
    "text":"Miniature Schnauzer"
    },
    {
    "id" : "Miniature Shar-Pei",
    "text":"Miniature Shar-Pei"
    },
    {
    "id" : "Mioritic Sheepdog",
    "text":"Mioritic Sheepdog"
    },
    {
    "id" : "Moscow Toy Terrier",
    "text":"Moscow Toy Terrier"
    },
    {
    "id" : "Moscow Vodolaz",
    "text":"Moscow Vodolaz"
    },
    {
    "id" : "Moscow Watchdog",
    "text":"Moscow Watchdog"
    },
    {
    "id" : "Mountain Cur",
    "text":"Mountain Cur"
    },
    {
    "id" : "Mountain Feist",
    "text":"Mountain Feist"
    },
    {
    "id" : "Mountain View Cur",
    "text":"Mountain View Cur"
    },
    {
    "id" : "Moyen Poodle",
    "text":"Moyen Poodle"
    },
    {
    "id" : "Mucuchies",
    "text":"Mucuchies"
    },
    {
    "id" : "Mudi",
    "text":"Mudi"
    },
    {
    "id" : "Munsterlander",
    "text":"Munsterlander"
    },
    {
    "id" : "Native American Indian Dog",
    "text":"Native American Indian Dog"
    },
    {
    "id" : "Neapolitan Mastiff",
    "text":"Neapolitan Mastiff"
    },
    {
    "id" : "Nebolish Mastiff",
    "text":"Nebolish Mastiff"
    },
    {
    "id" : "Nenets Herding Laika",
    "text":"Nenets Herding Laika"
    },
    {
    "id" : "New Guinea Singing Dog",
    "text":"New Guinea Singing Dog"
    },
    {
    "id" : "New Zealand Heading Dog",
    "text":"New Zealand Heading Dog"
    },
    {
    "id" : "New Zealand Huntaway",
    "text":"New Zealand Huntaway"
    },
    {
    "id" : "Newfoundland",
    "text":"Newfoundland"
    },
    {
    "id" : "Norrbottenspets",
    "text":"Norrbottenspets"
    },
    {
    "id" : "Norfolk Terrier",
    "text":"Norfolk Terrier"
    },
    {
    "id" : "North American Miniature Australian Shepherd",
    "text":"North American Miniature Australian Shepherd"
    },
    {
    "id" : "Northeasterly Hauling Laika",
    "text":"Northeasterly Hauling Laika"
    },
    {
    "id" : "Northern Inuit Dog",
    "text":"Northern Inuit Dog"
    },
    {
    "id" : "Norwegian Buhund",
    "text":"Norwegian Buhund"
    },
    {
    "id" : "Norwegian Elkhound",
    "text":"Norwegian Elkhound"
    },
    {
    "id" : "Norwegian Hound",
    "text":"Norwegian Hound"
    },
    {
    "id" : "Norwegian Lundehund",
    "text":"Norwegian Lundehund"
    },
    {
    "id" : "Norwich Terrier",
    "text":"Norwich Terrier"
    },
    {
    "id" : "Nova Scotia Duck-Tolling Retriever",
    "text":"Nova Scotia Duck-Tolling Retriever"
    },
    {
    "id" : "Ol' Southern Catchdog",
    "text":"Ol' Southern Catchdog"
    },
    {
    "id" : "Old Danish Chicken Dog",
    "text":"Old Danish Chicken Dog"
    },
    {
    "id" : "Old English Mastiff",
    "text":"Old English Mastiff"
    },
    {
    "id" : "Old English Sheepdog (Bobtail)",
    "text":"Old English Sheepdog (Bobtail)"
    },
    {
    "id" : "Old-Time Farm Shepherd",
    "text":"Old-Time Farm Shepherd"
    },
    {
    "id" : "Olde Boston Bulldogge",
    "text":"Olde Boston Bulldogge"
    },
    {
    "id" : "Olde English Bulldogge",
    "text":"Olde English Bulldogge"
    },
    {
    "id" : "Olde Victorian Bulldogge",
    "text":"Olde Victorian Bulldogge"
    },
    {
    "id" : "Original English Bulldogge",
    "text":"Original English Bulldogge"
    },
    {
    "id" : "Original Mountain Cur",
    "text":"Original Mountain Cur"
    },
    {
    "id" : "Otterhound",
    "text":"Otterhound"
    },
    {
    "id" : "Otto Bulldog",
    "text":"Otto Bulldog"
    },
    {
    "id" : "Owczarek Podhalanski",
    "text":"Owczarek Podhalanski"
    },
    {
    "id" : "Pakistani Bull Dog (Gull Dong)",
    "text":"Pakistani Bull Dog (Gull Dong)"
    },
    {
    "id" : "Pakistani Bull Terrier (Pakistani Gull Terr)",
    "text":"Pakistani Bull Terrier (Pakistani Gull Terr)"
    },
    {
    "id" : "Pakistani Mastiff (Pakisani Bully Kutta)",
    "text":"Pakistani Mastiff (Pakisani Bully Kutta)"
    },
    {
    "id" : "Pakistani Shepherd Dog (Bhagyari Kutta)",
    "text":"Pakistani Shepherd Dog (Bhagyari Kutta)"
    },
    {
    "id" : "Pakistani Tazi Hound",
    "text":"Pakistani Tazi Hound"
    },
    {
    "id" : "Pakistani Vikhan Dog",
    "text":"Pakistani Vikhan Dog"
    },
    {
    "id" : "Panda Shepherd",
    "text":"Panda Shepherd"
    },
    {
    "id" : "Papillon",
    "text":"Papillon"
    },
    {
    "id" : "Parson Russell Terrier",
    "text":"Parson Russell Terrier"
    },
    {
    "id" : "Patterdale Terrier",
    "text":"Patterdale Terrier"
    },
    {
    "id" : "Pekingese",
    "text":"Pekingese"
    },
    {
    "id" : "Pembroke Welsh Corgi",
    "text":"Pembroke Welsh Corgi"
    },
    {
    "id" : "Pencil-tail Feist",
    "text":"Pencil-tail Feist"
    },
    {
    "id" : "Perdiguero de Burgos",
    "text":"Perdiguero de Burgos"
    },
    {
    "id" : "Perdiguero Navarro",
    "text":"Perdiguero Navarro"
    },
    {
    "id" : "Perro Cimarron",
    "text":"Perro Cimarron"
    },
    {
    "id" : "Perro de Pastor Mallorquin",
    "text":"Perro de Pastor Mallorquin"
    },
    {
    "id" : "Perro de Presa Canario",
    "text":"Perro de Presa Canario"
    },
    {
    "id" : "Perro de Presa Mallorquin",
    "text":"Perro de Presa Mallorquin"
    },
    {
    "id" : "Perro Dogo Mallorquin",
    "text":"Perro Dogo Mallorquin"
    },
    {
    "id" : "Perro Ratonero Andaluz",
    "text":"Perro Ratonero Andaluz"
    },
    {
    "id" : "Peruvian Inca Orchid (PIO)",
    "text":"Peruvian Inca Orchid (PIO)"
    },
    {
    "id" : "Petit Basset Griffon Vendeen",
    "text":"Petit Basset Griffon Vendeen"
    },
    {
    "id" : "Petit Bleu de Gascogne",
    "text":"Petit Bleu de Gascogne"
    },
    {
    "id" : "Petit Brabancon",
    "text":"Petit Brabancon"
    },
    {
    "id" : "Petit Gascon Saintongeois",
    "text":"Petit Gascon Saintongeois"
    },
    {
    "id" : "Pharaoh Hound",
    "text":"Pharaoh Hound"
    },
    {
    "id" : "Phu Quoc Ridgeback Dog",
    "text":"Phu Quoc Ridgeback Dog"
    },
    {
    "id" : "Picardy Spaniel",
    "text":"Picardy Spaniel"
    },
    {
    "id" : "Pit Bull Terrier",
    "text":"Pit Bull Terrier"
    },
    {
    "id" : "Plott Hound",
    "text":"Plott Hound"
    },
    {
    "id" : "Plummer Hound",
    "text":"Plummer Hound"
    },
    {
    "id" : "Pocket Beagle",
    "text":"Pocket Beagle"
    },
    {
    "id" : "Podenco Ibicenco",
    "text":"Podenco Ibicenco"
    },
    {
    "id" : "Pointer",
    "text":"Pointer"
    },
    {
    "id" : "Poitevin",
    "text":"Poitevin"
    },
    {
    "id" : "Polish Hound",
    "text":"Polish Hound"
    },
    {
    "id" : "Polish Tatra Sheepdog",
    "text":"Polish Tatra Sheepdog"
    },
    {
    "id" : "Polish Lowland Sheepdog",
    "text":"Polish Lowland Sheepdog"
    },
    {
    "id" : "Pomeranian",
    "text":"Pomeranian"
    },
    {
    "id" : "Poodle",
    "text":"Poodle"
    },
    {
    "id" : "Porcelaine",
    "text":"Porcelaine"
    },
    {
    "id" : "Portuguese Hound",
    "text":"Portuguese Hound"
    },
    {
    "id" : "Portuguese Pointer",
    "text":"Portuguese Pointer"
    },
    {
    "id" : "Portuguese Sheepdog",
    "text":"Portuguese Sheepdog"
    },
    {
    "id" : "Portuguese Water Dog",
    "text":"Portuguese Water Dog"
    },
    {
    "id" : "Posavac Hound",
    "text":"Posavac Hound"
    },
    {
    "id" : "Potsdam Greyhound",
    "text":"Potsdam Greyhound"
    },
    {
    "id" : "Prazsky Krysavik",
    "text":"Prazsky Krysavik"
    },
    {
    "id" : "Presa Canario",
    "text":"Presa Canario"
    },
    {
    "id" : "Price Boar Beisser",
    "text":"Price Boar Beisser"
    },
    {
    "id" : "Pudelpointer",
    "text":"Pudelpointer"
    },
    {
    "id" : "Pug",
    "text":"Pug"
    },
    {
    "id" : "Puli (Pulik)",
    "text":"Puli (Pulik)"
    },
    {
    "id" : "Pumi",
    "text":"Pumi"
    },
    {
    "id" : "Pyrenean Mastiff",
    "text":"Pyrenean Mastiff"
    },
    {
    "id" : "Pyrenean Mountain Dog",
    "text":"Pyrenean Mountain Dog"
    },
    {
    "id" : "Pyrenean Shepherd",
    "text":"Pyrenean Shepherd"
    },
    {
    "id" : "Queensland Heeler",
    "text":"Queensland Heeler"
    },
    {
    "id" : "Queen Elizabeth Pocket Beagle",
    "text":"Queen Elizabeth Pocket Beagle"
    },
    {
    "id" : "Rafeiro do Alentejo",
    "text":"Rafeiro do Alentejo"
    },
    {
    "id" : "Rajapalayam",
    "text":"Rajapalayam"
    },
    {
    "id" : "Rampur Greyhound",
    "text":"Rampur Greyhound"
    },
    {
    "id" : "Rastreador Brasileiro",
    "text":"Rastreador Brasileiro"
    },
    {
    "id" : "Rat Terrier",
    "text":"Rat Terrier"
    },
    {
    "id" : "Redbone Coonhound",
    "text":"Redbone Coonhound"
    },
    {
    "id" : "Red-Tiger Bulldog",
    "text":"Red-Tiger Bulldog"
    },
    {
    "id" : "Rhodesian Ridgeback",
    "text":"Rhodesian Ridgeback"
    },
    {
    "id" : "Roman Rottweiler",
    "text":"Roman Rottweiler"
    },
    {
    "id" : "Rottweiler",
    "text":"Rottweiler"
    },
    {
    "id" : "Rough Collie",
    "text":"Rough Collie"
    },
    {
    "id" : "Rumanian Sheepdog",
    "text":"Rumanian Sheepdog"
    },
    {
    "id" : "Russian Bear Schnauzer",
    "text":"Russian Bear Schnauzer"
    },
    {
    "id" : "Russian Harlequin Hound",
    "text":"Russian Harlequin Hound"
    },
    {
    "id" : "Russian Hound",
    "text":"Russian Hound"
    },
    {
    "id" : "Russian Spaniel",
    "text":"Russian Spaniel"
    },
    {
    "id" : "Russian Toy",
    "text":"Russian Toy"
    },
    {
    "id" : "Russian Tsvetnaya Bolonka",
    "text":"Russian Tsvetnaya Bolonka"
    },
    {
    "id" : "Russian Wolfhound",
    "text":"Russian Wolfhound"
    },
    {
    "id" : "Russo-European Laika",
    "text":"Russo-European Laika"
    },
    {
    "id" : "Saarlooswolfhond",
    "text":"Saarlooswolfhond"
    },
    {
    "id" : "Sabueso Español",
    "text":"Sabueso Español"
    },
    {
    "id" : "Sage Ashayeri",
    "text":"Sage Ashayeri"
    },
    {
    "id" : "Sage Koochee",
    "text":"Sage Koochee"
    },
    {
    "id" : "Sage Mazandarani",
    "text":"Sage Mazandarani"
    },
    {
    "id" : "Saint Bernard",
    "text":"Saint Bernard"
    },
    {
    "id" : "Saluki",
    "text":"Saluki"
    },
    {
    "id" : "Samoyed",
    "text":"Samoyed"
    },
    {
    "id" : "Sanshu Dog",
    "text":"Sanshu Dog"
    },
    {
    "id" : "Sapsari",
    "text":"Sapsari"
    },
    {
    "id" : "Sarplaninac",
    "text":"Sarplaninac"
    },
    {
    "id" : "Schapendoes",
    "text":"Schapendoes"
    },
    {
    "id" : "Schiller Hound",
    "text":"Schiller Hound"
    },
    {
    "id" : "Schipperke",
    "text":"Schipperke"
    },
    {
    "id" : "Schnauzer",
    "text":"Schnauzer"
    },
    {
    "id" : "Scotch Collie",
    "text":"Scotch Collie"
    },
    {
    "id" : "Scottish Deerhound",
    "text":"Scottish Deerhound"
    },
    {
    "id" : "Scottish Terrier (Scottie)",
    "text":"Scottish Terrier (Scottie)"
    },
    {
    "id" : "Sealydale Terrier",
    "text":"Sealydale Terrier"
    },
    {
    "id" : "Sealyham Terrier",
    "text":"Sealyham Terrier"
    },
    {
    "id" : "Segugio Italiano",
    "text":"Segugio Italiano"
    },
    {
    "id" : "Serbian Hound",
    "text":"Serbian Hound"
    },
    {
    "id" : "Shar-Pei",
    "text":"Shar-Pei"
    },
    {
    "id" : "Shetland Sheepdog (Sheltie)",
    "text":"Shetland Sheepdog (Sheltie)"
    },
    {
    "id" : "Shiba Inu",
    "text":"Shiba Inu"
    },
    {
    "id" : "Shih Tzu",
    "text":"Shih Tzu"
    },
    {
    "id" : "Shika Inu",
    "text":"Shika Inu"
    },
    {
    "id" : "Shikoku",
    "text":"Shikoku"
    },
    {
    "id" : "Shiloh Shepherd",
    "text":"Shiloh Shepherd"
    },
    {
    "id" : "Siberian Husky",
    "text":"Siberian Husky"
    },
    {
    "id" : "Siberian Laika",
    "text":"Siberian Laika"
    },
    {
    "id" : "Silken Windhound",
    "text":"Silken Windhound"
    },
    {
    "id" : "Silky Terrier",
    "text":"Silky Terrier"
    },
    {
    "id" : "Simaku",
    "text":"Simaku"
    },
    {
    "id" : "Skye Terrier",
    "text":"Skye Terrier"
    },
    {
    "id" : "Sloughi",
    "text":"Sloughi"
    },
    {
    "id" : "Slovakian Hound",
    "text":"Slovakian Hound"
    },
    {
    "id" : "Slovakian Rough Haired Pointer",
    "text":"Slovakian Rough Haired Pointer"
    },
    {
    "id" : "Slovensky Cuvac",
    "text":"Slovensky Cuvac"
    },
    {
    "id" : "Slovensky Hrubosrsty Stavac",
    "text":"Slovensky Hrubosrsty Stavac"
    },
    {
    "id" : "Slovensky Kopov",
    "text":"Slovensky Kopov"
    },
    {
    "id" : "Smalandsstovare",
    "text":"Smalandsstovare"
    },
    {
    "id" : "Small Bernese Hound",
    "text":"Small Bernese Hound"
    },
    {
    "id" : "Small Greek Domestic Dog",
    "text":"Small Greek Domestic Dog"
    },
    {
    "id" : "Small Jura Hound",
    "text":"Small Jura Hound"
    },
    {
    "id" : "Small Lucerne Hound",
    "text":"Small Lucerne Hound"
    },
    {
    "id" : "Small Munsterlander",
    "text":"Small Munsterlander"
    },
    {
    "id" : "Small Schwyz Hound",
    "text":"Small Schwyz Hound"
    },
    {
    "id" : "Small Swiss Hound",
    "text":"Small Swiss Hound"
    },
    {
    "id" : "Smooth Collie",
    "text":"Smooth Collie"
    },
    {
    "id" : "Smooth Fox Terrier",
    "text":"Smooth Fox Terrier"
    },
    {
    "id" : "Soft Coated Wheaten Terrier",
    "text":"Soft Coated Wheaten Terrier"
    },
    {
    "id" : "South Russian Ovtcharka",
    "text":"South Russian Ovtcharka"
    },
    {
    "id" : "Spaniel de Pont-Audemer",
    "text":"Spaniel de Pont-Audemer"
    },
    {
    "id" : "Spanish Bulldog",
    "text":"Spanish Bulldog"
    },
    {
    "id" : "Spanish Hound",
    "text":"Spanish Hound"
    },
    {
    "id" : "Spanish Mastiff",
    "text":"Spanish Mastiff"
    },
    {
    "id" : "Spanish Water Dog",
    "text":"Spanish Water Dog"
    },
    {
    "id" : "Spinone Italiano",
    "text":"Spinone Italiano"
    },
    {
    "id" : "Springer Spaniel",
    "text":"Springer Spaniel"
    },
    {
    "id" : "Srpski Gonic",
    "text":"Srpski Gonic"
    },
    {
    "id" : "Srpski Trobojni Gonic",
    "text":"Srpski Trobojni Gonic"
    },
    {
    "id" : "Srpski Planinski Gonic",
    "text":"Srpski Planinski Gonic"
    },
    {
    "id" : "St. Germain Pointing Dog",
    "text":"St. Germain Pointing Dog"
    },
    {
    "id" : "Stabyhoun",
    "text":"Stabyhoun"
    },
    {
    "id" : "Staffordshire Bull Terrier",
    "text":"Staffordshire Bull Terrier"
    },
    {
    "id" : "Standard American Eskimo",
    "text":"Standard American Eskimo"
    },
    {
    "id" : "Standard Poodle",
    "text":"Standard Poodle"
    },
    {
    "id" : "Standard Schnauzer",
    "text":"Standard Schnauzer"
    },
    {
    "id" : "Stephens' Stock Mountain Cur",
    "text":"Stephens' Stock Mountain Cur"
    },
    {
    "id" : "Stichelhaar",
    "text":"Stichelhaar"
    },
    {
    "id" : "Strellufstover",
    "text":"Strellufstover"
    },
    {
    "id" : "Styrian Roughhaired Mountain Hound",
    "text":"Styrian Roughhaired Mountain Hound"
    },
    {
    "id" : "Sussex Spaniel",
    "text":"Sussex Spaniel"
    },
    {
    "id" : "Swedish Elkhound",
    "text":"Swedish Elkhound"
    },
    {
    "id" : "Swedish Lapphund",
    "text":"Swedish Lapphund"
    },
    {
    "id" : "Swedish Vallhund",
    "text":"Swedish Vallhund"
    },
    {
    "id" : "Swiss Hound",
    "text":"Swiss Hound"
    },
    {
    "id" : "Swiss Laufhund",
    "text":"Swiss Laufhund"
    },
    {
    "id" : "Swiss Shorthaired Pinscher",
    "text":"Swiss Shorthaired Pinscher"
    },
    {
    "id" : "Tahltan Bear Dog",
    "text":"Tahltan Bear Dog"
    },
    {
    "id" : "Taigan",
    "text":"Taigan"
    },
    {
    "id" : "Tamaskan Dog",
    "text":"Tamaskan Dog"
    },
    {
    "id" : "Tangkhul Hui",
    "text":"Tangkhul Hui"
    },
    {
    "id" : "Tasy",
    "text":"Tasy"
    },
    {
    "id" : "Teacup Poodle",
    "text":"Teacup Poodle"
    },
    {
    "id" : "Teddy Roosevelt Terrier",
    "text":"Teddy Roosevelt Terrier"
    },
    {
    "id" : "Telomian",
    "text":"Telomian"
    },
    {
    "id" : "Tenterfield Terrier",
    "text":"Tenterfield Terrier"
    },
    {
    "id" : "Tepeizeuintli",
    "text":"Tepeizeuintli"
    },
    {
    "id" : "Thai Bangkaew Dog",
    "text":"Thai Bangkaew Dog"
    },
    {
    "id" : "Thai Ridgeback",
    "text":"Thai Ridgeback"
    },
    {
    "id" : "The Carolina Dog",
    "text":"The Carolina Dog"
    },
    {
    "id" : "Tibetan KyiApso",
    "text":"Tibetan KyiApso"
    },
    {
    "id" : "Tibetan Mastiff",
    "text":"Tibetan Mastiff"
    },
    {
    "id" : "Tibetan Spaniel",
    "text":"Tibetan Spaniel"
    },
    {
    "id" : "Tibetan Terrier",
    "text":"Tibetan Terrier"
    },
    {
    "id" : "Titan Bull-Dogge",
    "text":"Titan Bull-Dogge"
    },
    {
    "id" : "Titan Terrier",
    "text":"Titan Terrier"
    },
    {
    "id" : "Tornjak",
    "text":"Tornjak"
    },
    {
    "id" : "Tosa Inu",
    "text":"Tosa Inu"
    },
    {
    "id" : "Toy American Eskimo",
    "text":"Toy American Eskimo"
    },
    {
    "id" : "Toy Fox Terrier",
    "text":"Toy Fox Terrier"
    },
    {
    "id" : "Toy German Spitz",
    "text":"Toy German Spitz"
    },
    {
    "id" : "Toy Manchester Terrier",
    "text":"Toy Manchester Terrier"
    },
    {
    "id" : "Toy Poodle",
    "text":"Toy Poodle"
    },
    {
    "id" : "Transylvanian Hound",
    "text":"Transylvanian Hound"
    },
    {
    "id" : "Treeing Tennessee Brindle",
    "text":"Treeing Tennessee Brindle"
    },
    {
    "id" : "Treeing Walker Coonhound",
    "text":"Treeing Walker Coonhound"
    },
    {
    "id" : "Tuareg Sloughi",
    "text":"Tuareg Sloughi"
    },
    {
    "id" : "Tyroler Bracke",
    "text":"Tyroler Bracke"
    },
    {
    "id" : "Utonagan",
    "text":"Utonagan"
    },
    {
    "id" : "Victorian Bulldog",
    "text":"Victorian Bulldog"
    },
    {
    "id" : "Villano de Las Encartaciones",
    "text":"Villano de Las Encartaciones"
    },
    {
    "id" : "Vizsla",
    "text":"Vizsla"
    },
    {
    "id" : "Volpino Italiano",
    "text":"Volpino Italiano"
    },
    {
    "id" : "Vucciriscu",
    "text":"Vucciriscu"
    },
    {
    "id" : "Weimaraner",
    "text":"Weimaraner"
    },
    {
    "id" : "Welsh Corgi",
    "text":"Welsh Corgi"
    },
    {
    "id" : "Welsh Sheepdog",
    "text":"Welsh Sheepdog"
    },
    {
    "id" : "Welsh Springer Spaniel",
    "text":"Welsh Springer Spaniel"
    },
    {
    "id" : "Welsh Terrier",
    "text":"Welsh Terrier"
    },
    {
    "id" : "West Highland White Terrier (Westie)",
    "text":"West Highland White Terrier (Westie)"
    },
    {
    "id" : "West Russian Coursing Hound",
    "text":"West Russian Coursing Hound"
    },
    {
    "id" : "West Siberian Laika",
    "text":"West Siberian Laika"
    },
    {
    "id" : "Westphalian Dachsbracke",
    "text":"Westphalian Dachsbracke"
    },
    {
    "id" : "Wetterhoun",
    "text":"Wetterhoun"
    },
    {
    "id" : "Wheaten Terrier",
    "text":"Wheaten Terrier"
    },
    {
    "id" : "Whippet",
    "text":"Whippet"
    },
    {
    "id" : "White English Bulldog",
    "text":"White English Bulldog"
    },
    {
    "id" : "White German Shepherd",
    "text":"White German Shepherd"
    },
    {
    "id" : "White Swiss Shepherd",
    "text":"White Swiss Shepherd"
    },
    {
    "id" : "Wire Fox Terrier",
    "text":"Wire Fox Terrier"
    },
    {
    "id" : "Wirehaired Pointing Griffon",
    "text":"Wirehaired Pointing Griffon"
    },
    {
    "id" : "Wirehaired Vizsla",
    "text":"Wirehaired Vizsla"
    },
    {
    "id" : "Xoloitzcuintle",
    "text":"Xoloitzcuintle"
    },
    {
    "id" : "Yakutian Laika",
    "text":"Yakutian Laika"
    },
    {
    "id" : "Yorkshire Terrier",
    "text":"Yorkshire Terrier"
    },
    {
    "id" : "Yugoslavian Hound",
    "text":"Yugoslavian Hound"
    }
];

breedObj.cat = [
	{
	"id"  :"Abyssinian",
	"text" :"Abyssinian"
	},
	{
	"id"    :"American Bobtail",
	"text" :"American Bobtail"
	},
	{
	"id"    :"American Curl",
	"text" :"American Curl"
	},
	{
	"id"    :"American Shorthair",
	"text" :"American Shorthair"
	},
	{
	"id"    :"American Wirehair",
	"text" :"American Wirehair"
	},
	{
	"id"    :"Balinese",
	"text" :"Balinese"
	},
	{
	"id"    :"Bengal",
	"text" :"Bengal"
	},
	{
	"id"    :"Birman",
	"text" :"Birman"
	},
	{
	"id"    :"Bombay",
	"text" :"Bombay"
	},
	{
	"id"    :"British Shorthair",
	"text" :"British Shorthair"
	},
	{
	"id"    :"Burmese",
	"text" :"Burmese"
	},
	{
	"id"    :"Burmilla",
	"text" :"Burmilla"
	},
	{
	"id"    :"Chartreux",
	"text" :"Chartreux"
	},
	{
	"id"    :"Colorpoint Shorthair",
	"text" :"Colorpoint Shorthair"
	},
	{
	"id"    :"Cornish Rex",
	"text" :"Cornish Rex"
	},
	{
	"id"    :"Devon Rex",
	"text" :"Devon Rex"
	},
	{
	"id"    :"Egyptian Mau",
	"text" :"Egyptian Mau"
	},
	{
	"id"    :"European Burmese",
	"text" :"European Burmese"
	},
	{
	"id"    :"Exotic",
	"text" :"Exotic"
	},
	{
	"id"    :"Havana Brown",
	"text" :"Havana Brown"
	},
	{
	"id"    :"Japanese Bobtail",
	"text" :"Japanese Bobtail"
	},
	{
	"id"    :"Khao Manee",
	"text" :"Khao Manee"
	},
	{
	"id"    :"Korat",
	"text" :"Korat"
	},
	{
	"id"    :"LaPerm",
	"text" :"LaPerm"
	},
	{
	"id"    :"Lykoi",
	"text" :"Lykoi"
	},
	{
	"id"    :"Maine Coon Cat",
	"text" :"Maine Coon Cat"
	},
	{
	"id"    :"Manx",
	"text" :"Manx"
	},
	{
	"id"    :"Norwegian Forest Cat",
	"text" :"Norwegian Forest Cat"
	},
	{
	"id"    :"Ocicat",
	"text" :"Ocicat"
	},
	{
	"id"    :"Oriental",
	"text" :"Oriental"
	},
	{
	"id"    :"Persian",
	"text" :"Persian"
	},
	{
	"id"    :"Ragamuffin",
	"text" :"Ragamuffin"
	},
	{
	"id"    :"Ragdoll",
	"text" :"Ragdoll"
	},
	{
	"id"    :"Russian Blue",
	"text" :"Russian Blue"
	},
	{
	"id"    :"Scottish Fold",
	"text" :"Scottish Fold"
	},
	{
	"id"    :"Selkirk Rex",
	"text" :"Selkirk Rex"
	},
	{
	"id"    :"Siamese",
	"text" :"Siamese"
	},
	{
	"id"    :"Siberian",
	"text" :"Siberian"
	},
	{
	"id"    :"Singapura",
	"text" :"Singapura"
	},
	{
	"id"    :"Somali",
	"text" :"Somali"
	},
	{
	"id"    :"Sphynx",
	"text" :"Sphynx"
	},
	{
	"id"    :"Tonkinese",
	"text" :"Tonkinese"
	},
	{
	"id"    :"Toybob",
	"text" :"Toybob"
	},
	{
	"id"    :"Turkish Angora",
	"text" :"Turkish Angora"
	},
	{
	"id"    :"Turkish Van",
	"text" :"Turkish Van"
	}
];

module.exports = breedObj, editorObj;