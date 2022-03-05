window.onload = () => {
  const constraintH3 = [...document.querySelectorAll("h3")].filter(
    (h) => h.innerHTML === "Constraints"
  )[0];
  const constraintHTMLCollection = constraintH3.nextElementSibling.children;
  const constraintArray = Array.from(constraintHTMLCollection);
  constraintArray.map((c) => addLabels(c));
};

const addLabels = function (constraint) {
  if (constraint.innerText.includes("task")) return;

  mathjaxString = constraint.querySelector("script").innerHTML;

  lowerIndex = mathjaxString.indexOf("\\leq");
  if (lowerIndex === -1) return;
  upperIndex = mathjaxString.lastIndexOf("\\leq") + 5;
  lowerBound = mathjaxString.slice(0, lowerIndex).trim();
  upperBound = mathjaxString.slice(upperIndex).trim();

  upperBoundValue = mathParse(upperBound);
  let label;
  if (upperBoundValue > 10 ** 9) {
    label = createLabel("long long");
  } else {
    label = createLabel("int");
  }

  constraint.append(label);
};

const mathParse = function (str) {
  // x . y ^ z,  x . y,  y ^ z,  y
  str = str.replace(/\s+/g, "");
  tokens = str.split("\\cdot");
  let x;
  if (tokens.length == 1) {
    x = 1;
    tokens = str.split("^");
  } else {
    x = tokens[0];
    split = tokens[1].split("^");
  }
  let y = tokens[0];
  let z = tokens[1] ?? 1;
  return x * y ** z;
};

const createLabel = function (str) {
  const colorMap = {
    int: "cyan",
    "long long": "orange",
  };

  let label = document.createElement("span");
  let content = document.createTextNode(str);
  label.appendChild(content);
  label.style.cssText = `color: black;
		padding: 4px; 
		padding-left: 8px;
		padding-right: 8px; 
		margin-left: 10px; 
		border-radius: 5px;`;
  label.style.background = colorMap[str];

  return label;
};
