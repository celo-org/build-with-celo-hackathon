import React, { useState, useMemo } from "react";
import { useCelo } from "@celo/react-celo";
import { useRouter } from "next/router";
import Select from "react-select";
import countryList from "react-select-country-list";
import Alert from "@mui/material/Alert";

const Home = () => {
  const { address } = useCelo();
  const router = useRouter();
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const options = useMemo(() => countryList().getData(), []);
  const [values, setValues] = useState({
    title: "",
    tobe_accepted: "",
    how_qualified: "",
    proposal_details: "",
    budget: "",
    country: "",
    tags: [],
  });
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOnchange = (e) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onCountryChange = (e) => {
    setCountry(e.label);
    setValues((prev) => ({ ...prev, tags: tags, country: country }));
  };
  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();

    if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
      setValues((prev) => ({ ...prev, tags: tagsCopy, country: country }));
    }
  };
  const onKeyUp = () => {
    setIsKeyReleased(true);
  };
  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues((prev) => ({ ...prev, tags: tags, country: country }));
    if (!address) {
      return <Alert severity="error">Connect Klaytn Wallet</Alert>;
    }

    if (country === "") {
      return <Alert severity="error">Add a Country</Alert>;
    }
    setLoading(true);
    const body = values;
    try {
      setValues((prev) => ({ ...prev, tags: tags, country: country }));
      const response = await fetch("/api/store-proposal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(values);
      if (response.status !== 200) {
        <Alert severity="error">Error Creating Proposal</Alert>;
        setLoading(false);
      } else {
        setValues({
          title: "",
          country: "",
          tags: [],
          tobe_accepted: "",
          how_qualified: "",
          proposal_details: "",
          budget: "",
        });
        setCountry("");
        setTags([]);
        <Alert severity="success">Proposal Successfully Created!</Alert>;
        setLoading(false);

        router.push("/");
        let responseJSON = await response.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div></div>;
};

export default Home;
