const soapRequest = require('easy-soap-request');
var convert = require('xml-js');
var xml2js = require('xml2js');
//https://www.pttor.com/th/oil_price

const GetSoapRequest = async (handleGetSoapRequest) => {
    const url = 'https://orapiweb.pttor.com/oilservice/OilPrice.asmx';
    const xml = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
        <CurrentOilPrice xmlns="http://www.pttor.com">
          <Language>th</Language>
        </CurrentOilPrice>
      </soap:Body>
    </soap:Envelope>`;

    const sampleHeaders = {
        'Content-Type': 'text/xml;charset=utf-8',
        'Accept-Encoding': 'gzip,deflate',
        'Content-Length': xml.length,
        'SOAPAction': "http://www.pttor.com/CurrentOilPrice"
    };

    const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 20000 });
    const { body, statusCode } = response;
    if (statusCode == 200) {
        var builder = new xml2js.Builder();
        var options = { explicitArray: false, tagNameProcessors: [xml2js.processors.stripPrefix] };
        xml2js.parseString(body, options, (err, result) => {
            if (err) {
                console.log('An error has occurred: ' + err);
                return;
            }
            // Get the soap body object
            var soapBody = result.Envelope.Body;
            // Remove optional attribute(s) from <Body> element.
            if (soapBody.$) {
                delete soapBody.$;
            }
            // Get the body XML if needed
            var soapBodyXML = builder.buildObject(soapBody);
            var parser = new xml2js.Parser({ explicitArray: false, trim: true });
            parser.parseString(soapBodyXML, (err, result) => {
                let data = result.CurrentOilPriceResponse.CurrentOilPriceResult;
                var result = convert.xml2json(data, { spaces: 1 });
                const resultData = JSON.parse(convert.xml2json(data, { compact: true, spaces: 0 }));
                handleGetSoapRequest(resultData);
            });
        });
    } else {
        handleGetSoapRequest('false');
    };
}

export default {
    GetSoapRequest
};