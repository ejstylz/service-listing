var x1 = 0;
var x2 = 0;
var x3 = 0;
var x4 = 0;
var x5 = 0;
var languages = [];
var areas = [];
var products = [];
var services = [];
var tags = [];

$("div").on("click", "i", function (event) {
    $(this).parent().parent().fadeOut(500, function () {
        $(this).remove();
        languages.splice(languages.indexOf(this.value), 1);
        areas.splice(areas.indexOf(this.value), 1);
        products.splice(products.indexOf(this.value), 1);
        services.splice(services.indexOf(this.value), 1);
        tags.splice(tags.indexOf(this.value), 1);
    });
    event.stopPropagation();
});

$(document).ready(function () {
    $('.add2').prop('disabled', true);
    $('#text2').keyup(function () {
        $('.add2').prop('disabled', this.value === "" ? true : false);
    })
});

$(document).ready(function () {
    $('.add3').prop('disabled', true);
    $('#text3').keyup(function () {
        $('.add3').prop('disabled', this.value === "" ? true : false);
    })
});

$(document).ready(function () {
    $('.add4').prop('disabled', true);
    $('#text4').keyup(function () {
        $('.add4').prop('disabled', this.value === "" ? true : false);
    })
});

$(document).ready(function () {
    $('.add5').prop('disabled', true);
    $('#text5').keyup(function () {
        $('.add5').prop('disabled', this.value === "" ? true : false);
    })
});

async function add_element_to_array_lang() {
    languages[x1] = await document.getElementById("text1").value;
    x1++;
    document.getElementById("text1").value = "";

    var e = " ";

    for (var y = 0; y < languages.length; y++) {
        // e += array[y] + "<br/>";
        if (languages[y] != undefined && languages[y] !== "") {
            e += "<span>" + languages[y] + "<a href='javascript:void(0)'> <i class='fa fa-times' aria-hidden='true'> </i> </a> </span>";
            document.getElementById("lang").innerHTML = e;
        }
    }

    languages.forEach(function (language) {
        let input = document.createElement("input");

        input.setAttribute("type", "hidden");

        input.setAttribute("name", "languages[]");

        input.setAttribute("value", language);

        //append to form element that you want .
        document.getElementById("lang").appendChild(input);
    });
}

async function add_element_to_array_exp() {
    areas[x2] = await document.getElementById("text2").value;
    x2++;
    // document.getElementById("text2").value = "";
    var e = " ";
    for (var y = 0; y < areas.length; y++) {
        // e += array[y] + "<br/>";
        if (areas[y] != undefined) {
            e += "<span>" + areas[y] + "<a href='javascript:void(0)'> <i class='fa fa-times' aria-hidden='true'> </i> </a> </span>"
        }
    }
    document.getElementById("exp").innerHTML = e;

    areas.forEach(function (area) {
        let input = document.createElement("input");

        input.setAttribute("type", "hidden");

        input.setAttribute("name", "areas[]");

        input.setAttribute("value", area);

        //append to form element that you want.
        document.getElementById("exp").appendChild(input);
    });
}

async function add_element_to_array_ser() {
    services[x3] = await document.getElementById("text3").value;
    x3++;
    // document.getElementById("text2").value = "";
    var e = " ";
    for (var y = 0; y < services.length; y++) {
        // e += array[y] + "<br/>";
        if (services[y] != undefined) {
            e += "<span>" + services[y] + "<a href='javascript:void(0)'> <i class='fa fa-times' aria-hidden='true'> </i> </a> </span>"
        }
    }
    document.getElementById("ser").innerHTML = e;

    services.forEach(function (service) {
        let input = document.createElement("input");

        input.setAttribute("type", "hidden");

        input.setAttribute("name", "services[]");

        input.setAttribute("value", service);

        //append to form element that you want .
        document.getElementById("exp").appendChild(input);
    });

}

async function add_element_to_array_pro() {
    products[x4] = await document.getElementById("text4").value;
    x4++;
    // document.getElementById("text2").value = "";
    var e = " ";
    for (var y = 0; y < products.length; y++) {
        // e += array[y] + "<br/>";
        if (products[y] != undefined) {
            e += "<span>" + products[y] + "<a href='javascript:void(0)'> <i class='fa fa-times' aria-hidden='true'> </i> </a> </span>"
        }
    }
    document.getElementById("pro").innerHTML = e;

    products.forEach(function (product) {
        let input = document.createElement("input");

        input.setAttribute("type", "hidden");

        input.setAttribute("name", "products[]");

        input.setAttribute("value", product);

        //append to form element that you want .
        document.getElementById("exp").appendChild(input);
    });
}

async function add_element_to_array_tag() {
    tags[x5] = await document.getElementById("text5").value;
    x5++;
    // document.getElementById("text2").value = "";
    var e = " ";
    for (var y = 0; y < tags.length; y++) {
        // e += array[y] + "<br/>";
        if (tags[y] != undefined) {
            e += "<span>" + tags[y] + "<a href='javascript:void(0)'> <i class='fa fa-times' aria-hidden='true'> </i> </a> </span>"
        }
    }
    document.getElementById("tag").innerHTML = e;

    tags.forEach(function (tag) {
        let input = document.createElement("input");

        input.setAttribute("type", "hidden");

        input.setAttribute("name", "tags[]");

        input.setAttribute("value", tag);

        //append to form element that you want .
        document.getElementById("exp").appendChild(input);
    });
}