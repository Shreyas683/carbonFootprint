import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import "../styles/upload.css";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [factoryName, setFactoryName] = useState("");
  const [uploadMessage, setUploadMessage] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);

  useEffect(() => {
    checkMetaMaskConnection();
  }, []);

  const checkMetaMaskConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setIsMetaMaskConnected(accounts.length > 0);
      } catch (error) {
        console.error("Error checking MetaMask connection:", error);
      }
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadMessage(null);
    setIpfsHash(null);
  };

  const handleFactoryChange = (event) => {
    setFactoryName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      setUploadMessage("Please select a file to upload.");
      return;
    }

    if (!factoryName) {
      setUploadMessage("Please select a factory name.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("factoryName", factoryName);

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setIpfsHash(result.IpfsHash);
        setUploadMessage("Upload successful! CID: " + result.IpfsHash);
        setSelectedFile(null);
        setFactoryName("");
        convertAndStoreFile(result.IpfsHash);
      } else {
        setUploadMessage("Upload failed: " + response.statusText);
      }
    } catch (error) {
      setUploadMessage("Upload failed: " + error.message);
    }
  };

  const convertAndStoreFile = async (ipfsHash) => {
    if (!selectedFile) return;

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const fileContent = fileReader.result;
      const jsonData = JSON.stringify({
        factoryName,
        ipfsHash,
        fileContent,
      });

      try {
        const response = await fetch("http://localhost:5000/store-json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonData,
        });

        if (!response.ok) {
          throw new Error("Failed to store JSON data");
        }
        console.log("JSON data stored successfully");
      } catch (error) {
        console.error("Error storing JSON data:", error);
      }
    };
    fileReader.readAsText(selectedFile);
  };

  const storeHashOnBlockchain = async () => {
    if (!ipfsHash || !isMetaMaskConnected) return;

    const contractAddress = "0x852233ff6e0997272a8fc707795e35a3349d919b";
    const contractABI = [
      {
        "constant": false,
        "inputs": [
          {
            "name": "_ipfsHash",
            "type": "string"
          }
        ],
        "name": "setHash",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "getHash",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "newHash",
            "type": "string"
          }
        ],
        "name": "HashSet",
        "type": "event"
      }
    ];

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      const tx = await contract.setHash(ipfsHash);
      await tx.wait();

      alert("Hash stored on blockchain successfully!");
    } catch (error) {
      console.error("Error storing hash on blockchain:", error);
      alert("Failed to store hash on blockchain: " + error.message);
    }
  };

  const factoryOptions = [
    { value: "factory-0", label: "Select Factory" },
    { value: "factory-1", label: "Agriculture, forestry and fishing" },
    { value: "factory-2", label: "Manufacturing" },
    { value: "factory-3", label: "Construction" },
    { value: "factory-4", label: "Transport and storage" },
    { value: "factory-5", label: "Mining and quarrying" },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="upload-file">
        Select file:
        <input type="file" id="upload-file" onChange={handleFileChange} />
      </label>



      
      <br />
      <label htmlFor="factory-dropdown">
        Factory Name:
        <select
          id="factory-dropdown"
          value={factoryName}
          onChange={handleFactoryChange}
        >
          {factoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit" className="button">
        Upload
      </button>
      {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
      {ipfsHash && isMetaMaskConnected && (
        <button
          type="button"
          onClick={storeHashOnBlockchain}
          className="button"
        >
          Store in Blockchain
        </button>
      )}
    </form>
  );
}

export default Upload;
