import { useState, useEffect } from "react";
import "./calculator.css";
// const SatoshiSvg = require("../../")
import Select from "react-select";

const Converter = () => {
  const [amount, setAmount] = useState();

  const [result, setResult] = useState();
  const [calculated, setCalculated] = useState();
  const [first, setFirst] = useState("BTC");
  const [second, setSecond] = useState("USDT");

  const [rates, setRates] = useState(null);
  useEffect(() => {
    fetch("https://api.lemoncash.io/api/v1/exchange-rates-quotations-external")
      .then((response) => response.json())
      .then((data) => {
        setRates(data.results);
      });
  }, []);

  // const { sale_price: { amount } } = filterConvert;

  useEffect(() => {
    if (rates) {
      const filterConvert = rates.filter((item) => {
        return item.instrument === `${first}-${second}`;
      });
      console.log(filterConvert, `${first}-${second}`);
      setResult(filterConvert);
    }
  }, [rates, first, second]);

  const handleTypeChangeFirst = (selectedOption) => {
    setFirst(selectedOption.value);
  };
  
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleTypeChangeSecond = (event) => {
    setSecond(event.target.value);
  };

  function calculateConversion(amount, firstCurrency, secondCurrency, rates) {
    if (first === "USDT" && second === "SAT") {
      const filterConvert = rates.filter((item) => {
        return item.instrument === "BTC-USDT";
      });
      const salePrice = filterConvert[0].sale_price.amount;
      const calculatedAmount = (amount / (salePrice / 100000000)).toFixed(2);
      setCalculated(calculatedAmount);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }

    if (first === "USDT" && second === "BTC") {
      const filterConvert = rates.filter((item) => {
        return item.instrument === "BTC-USDT";
      });
      const salePrice = filterConvert[0].sale_price.amount;
      const calculatedAmount = (amount / salePrice).toFixed(7);
      setCalculated(calculatedAmount);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }

    if (first === "SAT" && second === "USDT") {
      const filterConvert = rates.filter((item) => {
        return item.instrument === "BTC-USDT";
      });
      const salePrice = filterConvert[0].sale_price.amount;
      const calculatedAmount = (amount * (salePrice / 100000000)).toFixed(7);
      setCalculated(calculatedAmount);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }

    if (first === "ARS" && second === "USDT") {
      const filterConvert = rates.filter((item) => {
        return item.instrument === "USDT-ARS";
      });
      const salePrice = filterConvert[0].sale_price.amount;
      const calculatedAmount = (amount / salePrice).toFixed(8);
      setCalculated(calculatedAmount);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }
    if (first === "SAT" && second === "BTC") {
      const calculatedAmount = (amount / 100000000).toFixed(8);
      setCalculated(calculatedAmount);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }
    if (first === "ARS" && second === "BTC") {
      const filterConvert = rates.filter((item) => {
        return item.instrument === "BTC-ARS";
      });
      const salePrice = filterConvert[0].sale_price.amount;
      const calculatedAmount = (amount / salePrice).toFixed(8);
      setCalculated(calculatedAmount);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }

    if (first === "SAT" && second === "ARS") {
      const filterConvert = rates.filter((item) => {
        return item.instrument === "BTC-ARS";
      });
      const salePrice = filterConvert[0].sale_price.amount;
      const calculatedAmount = (amount * (salePrice / 100000000)).toFixed(2);
      setCalculated(calculatedAmount);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }

    if (first === "ARS" && second === "SAT") {
      const filterConvert = rates.filter((item) => {
        return item.instrument === "BTC-ARS";
      });
      const salePrice = filterConvert[0].sale_price.amount;
      const calculatedAmount = ((amount / salePrice) * 100000000).toFixed(2);
      setCalculated(calculatedAmount);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }

    if (first === "BTC" && second === "SAT") {
      const calculatedAmount = (amount * 100000000).toFixed(0);
      setCalculated(calculatedAmount);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>}`;
    }
    if (result.length > 0) {
      const calculatedAmount = (amount * result[0].sale_price.amount).toFixed(
        2
      );
      setCalculated(calculatedAmount);
      document.getElementById(
        "calculated"
      ).innerHTML = `<span class="bold">${amount} ${first}</span> <span class="are"> son </span><br/> <span class="result">${calculatedAmount} ${second}</span>`;
    }
  }

  const handleSubmit = () => {
    const calculatedAmount = calculateConversion(amount, first, second, rates);
    return calculatedAmount;
  };

  const options = [
    { value: "BTC", label: "BTC", image: { src: "../../public/btc_calc.svg" } },
    {
      value: "SAT",
      label: "SAT",
      image: { src: "../../public/satoshi_calc.svg" },
    },
    { value: "ARS", label: "ARS", image: { src: "../../public/ars_calc.svg" } },
    {
      value: "USDT",
      label: "USDT",
      image: { src: "../../public/usdt_calc.svg" }
    },
  ];
  const secondOptions = options.map(option => ({
    ...option,
    isDisabled: option.value === second,
  }));

  const formatOptionLabel = ({ value, label, image }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={image.src}
        width="30px"
        style={{ marginRight: "10px" }}
        alt={label}
      />
      {label}
    </div>
  );
  return (
    <div className="container">
      <h1 className="title">Calculadora de Satoshis</h1>
      <input
        type="number"
        id="amountInput"
        className="input"
        placeholder="Ingresa un valor"
        value={amount}
        onChange={handleAmountChange}
      />
      {/* <select
        id="conversionTypeFirst"
        className="select"
        value={first}
        onChange={handleTypeChangeFirst}>
        <option value="BTC" defaultValue disabled={first !== second}>
          BTC
        </option>
        <option value="SAT">
          SAT
        </option>
        <option value="ARS">ARS</option>
        <option value="USDT">USDT</option>
      </select> */}
      <Select
        value={options.find(option => option.value === first)}
        onChange={handleTypeChangeFirst}
        isSearchable={false}
        formatOptionLabel={formatOptionLabel}
        options={secondOptions}

      />
      <select
        id="conversionTypeSecond"
        className="select"
        value={second}
        onChange={handleTypeChangeSecond}>
        <option value="BTC">BTC</option>
        <option value="SAT">SAT</option>
        <option value="ARS">ARS</option>
        <option value="USDT" defaultValue>
          USDT
        </option>
      </select>
      <button className="button" onClick={() => handleSubmit()}>
        Convertir
      </button>
      <div id="calculated" />
    </div>
  );
};

export default Converter;
