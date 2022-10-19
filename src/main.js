import "./css/index.css"
import IMask from "imask";

const ccBgColor01 = document.querySelector(".cc-bg svg > g g:nth-child(1) path");
const ccBgColor02 = document.querySelector(".cc-bg svg > g g:nth-child(2) path");
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");

function setCardType(type)
{
  const colors = {
    visa: ["#436D99", "#2D57D2"],
    mastercard: ["#DF6F29", "#C69347"],
    default: ["black", "gray"]
  }

  ccBgColor01.setAttribute("fill", colors[type][0]);
  ccBgColor02.setAttribute("fill", colors[type][1]);
  ccLogo.setAttribute("src", `cc-${type}.svg`);
}

// globalThis.setCardType="default";
setCardType("default");

//? Minha forma de formatar o ano
// const dateCurrent = new Date(); 
// const yearCurrent = dateCurrent.getFullYear().toString().substring(2)//? ou .slice(2)
// const yearSmall = parseInt(yearCurrent)
// const validity = yearSmall+10; 

const cardNumber = document.getElementById('card-number');
const nameCard = document.getElementById('card-holder');
const expirationDate = document.getElementById('expiration-date');
const securityCode = document.getElementById('security-code');

const cardNumberPattern = { 
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/, //? inicia com 4, com digitos de 0 à 15
      cardType: 'visa',
    },
    {
      mask: "0000 0000 0000 0000",
      //? começa com 5, o próximo entre 1 e 5, aceita digitos de 0 à 2
      //? ou inicia com 22, o próximo d vai do 2 até o 9, e pode ter mais 1 d
      //? ou inicia com 2, entre 3 e 7, e tera entre 0 e 2 d depois  
      //? passando dessa parte da expressão, após irá de 0 até 12 d 
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/, //? 
      cardType: 'mastercard',
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: 'default',
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    //? /\D/g = D = não é digito, g = tudo
    const number = (dynamicMasked.value + appended).replace(/\D/g, "");
    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
    //? ou const foundMask = dynamicMasked.compiledMasks.find(({regex}) => number.match(regex))
      
      return number.match(item.regex)
    });
    console.log(foundMask);
    return foundMask;
  },
};

const maskName = { mask: '[aaa]' };

const expirationDatePattern = { 
  mask: 'MM{/}YY',
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10) .slice(2),
    }
  }
};

const securityCodePattern = { mask: '0000' };

const cardNumberMasked = IMask(cardNumber, cardNumberPattern); 
const mask = IMask(nameCard, maskName);
const expirationDateMasked = IMask(expirationDate, expirationDatePattern);
const securityCodeMasked = IMask(securityCode, securityCodePattern);
