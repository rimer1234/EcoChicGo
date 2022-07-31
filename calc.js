let mat1, pct1;

var c = 0, w = 0, e = 0, eut = 0, ch = 0;


function updateChart()
{
    document.getElementById("container").innerHTML = "";
        // data set
        var data = [
            {x: "CO2", value: c},
            {x: "Water", value: w},
            {x: "Energy", value: e},
            {x: "Eutrophy", value: eut},
            {x: "Chemistry", value: ch},
        ];
          
        // create and configure a pie chart
        chart1 = anychart.pie(data);
        chart1.innerRadius("90%");
    
        // create a bar chart
        chart2 = anychart.bar();
        var series = chart2.bar(data);
        series.name("MSI");
        series.labels().fontSize(5);
                      
        chart2.background().fill("none");
            
        // set bar chart as the center content of a pie chart
        var msi = c+w+e+eut+ch;
        msi = Math.ceil(msi)
        chart1.center().content(chart2);
        chart1.background().fill("none");
        chart1.title("Outfit Sustainability Score Composition");

       document.getElementById("result").innerHTML = "The Outfits's Sustainability Score: " + String(msi);
       if (msi <= 40)
            document.getElementById("result").style.color = "green";
        else if (msi < 80)
            document.getElementById("result").style.color = "orange";
        else
            document.getElementById("result").style.color = "red";
        chart1.container("container");
        chart1.draw();  
}


function calcScores()
{
    var pct = parseInt(document.getElementById("pct").value);
    var pct1 = parseInt(document.getElementById("pct1").value);
    var pct2 = parseInt(document.getElementById("pct2").value);
    var pct3 = parseInt(document.getElementById("pct3").value);

    var tot = pct + pct1 + pct2 + pct3;
    if (tot < 100 || tot > 100)
    {
        alert("Total Percentage of Fabric Types should be 100%");
        document.getElementById("result").innerHTML = "";
        document.getElementById("container").innerHTML = "";
        return;
    }
    
    var mat = document.getElementById("clothes").value;
    for (i = 0; i < Fabric.length; i++)
    {
        if (mat == Fabric[i] && pct >= 0.0)
        {
            c = pct / 100 * CO2[i];
            w = pct / 100 * Water[i];
            e = pct / 100 * Energy[i];
            eut = pct / 100 * Eut[i];
            ch = pct / 100 * Chem[i];
            break;
        }
    }
    
    mat = document.getElementById("clothes1").value;
    for (i = 0; i < Fabric.length; i++)
    {
        if (mat == Fabric[i] && pct1 >= 0.0)
        {
            c += pct1 / 100 * CO2[i];
            w += pct1 / 100 * Water[i];
            e += pct1 / 100 * Energy[i];
            eut += pct1 / 100 * Eut[i];
            ch += pct1 / 100 * Chem[i];
            break;
        }
    }

    mat = document.getElementById("clothes2").value;
    for (i = 0; i < Fabric.length; i++)
    {
        if (mat == Fabric[i] && pct2 >= 0.0)
        {
            c += pct2 / 100 * CO2[i];
            w += pct2 / 100 * Water[i];
            e += pct2 / 100 * Energy[i];
            eut += pct2 / 100 * Eut[i];
            ch += pct2 / 100 * Chem[i];
            break;
        }
    }

    mat = document.getElementById("clothes3").value;
    for (i = 0; i < Fabric.length; i++)
    {
        if (mat == Fabric[i] && pct3 >= 0.0)
        {
            c += pct3 / 100 * CO2[i];
            w += pct3 / 100 * Water[i];
            e += pct3 / 100 * Energy[i];
            eut += pct3 / 100 * Eut[i];
            ch += pct3 / 100 * Chem[i];
            break;
        }
    }

    updateChart();
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            document.getElementById("blah").src = e.target.result;
         };

        reader.readAsDataURL(input.files[0]);
    }
}


function add()
{
    if (localStorage['w_img'])
        w_img = JSON.parse(localStorage.getItem('w_img'));
    if (localStorage['w_name'])
        w_name = JSON.parse(localStorage.getItem('w_name'));
    if (localStorage['w_c'])
        w_c = JSON.parse(localStorage.getItem('w_c'));
    if (localStorage['w_e'])
        w_e = JSON.parse(localStorage.getItem('w_e'));
    if (localStorage['w_eut'])
        w_eut = JSON.parse(localStorage.getItem('w_eut'));
    if (localStorage['w_w'])
        w_w = JSON.parse(localStorage.getItem('w_w'));
    if (localStorage['w_chem'])
        w_chem = JSON.parse(localStorage.getItem('w_chem'));

    
    if (w_img != null)
        w_idx = w_img.length;
    
    w_img[w_idx] =  document.getElementById("blah").src;
    w_name[w_idx]  = "my dress";
       
    w_c[w_idx]  = Math.round(c);
    w_e[w_idx]  = Math.round(e);
    w_eut[w_idx] = Math.round(eut);
    w_chem[w_idx] = Math.round(ch);
    w_w[w_idx] = Math.round(w);
    
    localStorage.setItem('w_img', JSON.stringify(w_img));
    localStorage.setItem('w_name', JSON.stringify(w_name));
    localStorage.setItem('w_c', JSON.stringify(w_c));
    localStorage.setItem('w_e', JSON.stringify(w_e));
    localStorage.setItem('w_eut', JSON.stringify(w_eut));
    localStorage.setItem('w_w', JSON.stringify(w_w));
    localStorage.setItem('w_chem', JSON.stringify(w_chem));
}

function updatelocalstorage()
{
    if (localStorage['w_img'])
        w_img = JSON.parse(localStorage.getItem('w_img'));
    if (localStorage['w_name'])
        w_name = JSON.parse(localStorage.getItem('w_name'));
    if (localStorage['w_c'])
        w_c = JSON.parse(localStorage.getItem('w_c'));
    if (localStorage['w_e'])
        w_e = JSON.parse(localStorage.getItem('w_e'));
    if (localStorage['w_eut'])
        w_eut = JSON.parse(localStorage.getItem('w_eut'));
    if (localStorage['w_w'])
        w_w = JSON.parse(localStorage.getItem('w_w'));
    if (localStorage['w_chem'])
    w_chem = JSON.parse(localStorage.getItem('w_chem'));


    if (w_img == null)
    {
        alert("here")
        localStorage.setItem('w_img', JSON.stringify(w_img));
        localStorage.setItem('w_name', JSON.stringify(w_name));
        localStorage.setItem('w_c', JSON.stringify(w_c));
        localStorage.setItem('w_e', JSON.stringify(w_e));
        localStorage.setItem('w_eut', JSON.stringify(w_eut));
        localStorage.setItem('w_w', JSON.stringify(w_w));
        localStorage.setItem('w_chem', JSON.stringify(w_chem));
    }
}



document.getElementById("clothes").value = "Cotton";
document.getElementById("clothes1").value = "Nylon";
document.getElementById("clothes2").value = "Spandex";
document.getElementById("clothes3").value = "Linen";

document.getElementById("pct").value = "60";
document.getElementById("pct1").value = "20";
document.getElementById("pct2").value = "10";
document.getElementById("pct3").value = "10";

updatelocalstorage()
calcScores()