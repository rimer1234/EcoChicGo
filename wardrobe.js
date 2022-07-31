function HideCards()
{
    document.getElementById("card1").style.display = "none";
    document.getElementById("card2").style.display = "none";
    document.getElementById("card3").style.display = "none";
    document.getElementById("card4").style.display = "none";
    document.getElementById("card5").style.display = "none";
    document.getElementById("card6").style.display = "none";
    document.getElementById("card7").style.display = "none";
    document.getElementById("card8").style.display = "none";
}

var c = 0, e = 0, eut = 0, w = 0, ch = 0, tmsi = 0, n = 0;
function ShowCards()
{
    c = 0, e = 0, eut = 0, w = 0, ch = 0, tmsi = 0, n = 0;
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

    var parent;

    for (let i = 0; i < w_img.length && i < 8; i++)
    {
        var name = "card" + String(i+1);
        parent = document.getElementById(name);
         
        var msi = w_c[i] +  w_e[i] + w_eut[i] + w_w[i] +  w_chem[i];
        msi = Math.round(msi);
        var children = parent.querySelectorAll('.child');
        children[0].innerHTML = w_name[i];
        children[1].src = w_img[i];
        
        var lc = Math.round(w_c[i]);
        var le = Math.round(w_e[i]);
        var lw = Math.round(w_w[i]);
        var leut = Math.round(w_eut[i]);
        var lch = Math.round(w_chem[i]);
        children[2].innerHTML = "CO<sub>2</sub>: " + String(lc) + "<br>Energy: " + String(le) +"<br>Eutrophy: " + String(leut) + "<br>Water: " + String(lw) + "<br>Chemistry: "+ String(lch) + "<br>Higg MSI: "+ msi;
        document.getElementById(name).style.display = "block";

        c += w_c[i];
        e += w_e[i];
        eut += w_eut[i];
        w += w_w[i];
        ch += w_chem[i];
        tmsi += msi;
        n++;
    }
}


function updateChart()
{
    document.getElementById("container").innerHTML = "";
    document.getElementById("result").innerHTML = "";
    if (n <= 0)
        return;
        
    var lc = Math.round(c / n);
    var le = Math.round(e / n);
    var leut = Math.round(eut / n);
    var lw = Math.round(w / n);
    var lch = Math.round(ch / n);
    var lmsi = Math.round(tmsi / n);
      // data set
        var data = [
            {x: "CO2", value: lc},
            {x: "Water", value: lw},
            {x: "Energy", value: le},
            {x: "Eutrophy", value: leut},
            {x: "Chemistry", value: lch},
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
        chart1.center().content(chart2);
        chart1.background().fill("none");
        chart1.title("My Wardrobe Sustainability Score Composition");

        document.getElementById("result").innerHTML = "My Wardrobe's Sustainability Score: " + String(lmsi);
        if (lmsi <= 40)
             document.getElementById("result").style.color = "green";
         else if (lmsi < 80)
             document.getElementById("result").style.color = "orange";
         else
             document.getElementById("result").style.color = "red";
        
        chart1.container("container");
        chart1.draw();  
}

var imgname = "";
function RemoveItem()
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

    var index = -1;
    for (let i = 0; i < w_img.length; i++)
    {
        if (w_img[i] == imgname)
        {
            index = i;
            break;
        }
    }

    if (index >= 0)
    {
        w_img.splice(index, 1);
        w_name.splice(index, 1);
        w_c.splice(index, 1);
        w_e.splice(index, 1);
        w_eut.splice(index, 1);
        w_w.splice(index, 1);
        w_chem.splice(index, 1);

        localStorage.setItem('w_img', JSON.stringify(w_img));
        localStorage.setItem('w_name', JSON.stringify(w_name));
        localStorage.setItem('w_c', JSON.stringify(w_c));
        localStorage.setItem('w_e', JSON.stringify(w_e));
        localStorage.setItem('w_eut', JSON.stringify(w_eut));
        localStorage.setItem('w_w', JSON.stringify(w_w));
        localStorage.setItem('w_chem', JSON.stringify(w_chem));

        HideCards()
        ShowCards()
        updateChart()
    }

}

function Remove1()
{
    imgname = document.getElementById("img1").src;
    RemoveItem();
}

function Remove2()
{
    imgname = document.getElementById("img2").src;
    RemoveItem();
}

function Remove3()
{
    imgname = document.getElementById("img3").src;
    RemoveItem();
}
function Remove4()
{
    imgname = document.getElementById("img4").src;
    RemoveItem();
}
function Remove5()
{
    imgname = document.getElementById("img5").src;
    RemoveItem();
}
function Remove6()
{
    imgname = document.getElementById("img6").src;
    RemoveItem();
}
function Remove7()
{
    imgname = document.getElementById("img7").src;
    RemoveItem();
}
function Remove8()
{
    imgname = document.getElementById("img8").src;
    RemoveItem();
}

HideCards()
ShowCards()
updateChart()