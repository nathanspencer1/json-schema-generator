const httpGet = async (url) => {
    // let xmlhttp = new XMLHttpRequest();
    // xmlhttp.onreadystatechange=function()
    // {
    //     if (xmlhttp.readyState===4 && xmlhttp.status===200)
    //     {
    //         return String(xmlhttp.responseText);
    //     }
    // }
    // xmlhttp.open("GET", url, false );
    // xmlhttp.send();
    return await fetch(url).then(r => r.text());
    // let response = "";
    // await fetch(url).then(r => response = r.text());
    // return response;
}

export default httpGet;