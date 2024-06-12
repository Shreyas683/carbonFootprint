import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import JsonConverter from "./jsonConverter";
import "../styles/upload.css";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [factoryName, setFactoryName] = useState("");
  const [uploadMessage, setUploadMessage] = useState(null);
  const [ipfsHash, setIpfsHash] = useState(null);
  const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
  const [isUploadMode, setIsUploadMode] = useState(true);
  const [downloadHash, setDownloadHash] = useState("");
  const [downloadMessage, setDownloadMessage] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

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
    setSelectedFile(event.target.files[0]);
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

  const convertAndStoreFile = async () => {
    if (!selectedFile) return;

    const fileReader = new FileReader();
    fileReader.onload = async () => {
      const fileContent = fileReader.result;
      const jsonData = JSON.stringify({
        fileContent,
      });

      try {
        const response = await fetch("http://localhost:3005/store-json", {
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
        constant: false,
        inputs: [
          {
            name: "_ipfsHash",
            type: "string",
          },
        ],
        name: "setHash",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        constant: true,
        inputs: [],
        name: "getHash",
        outputs: [
          {
            name: "",
            type: "string",
          },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            name: "newHash",
            type: "string",
          },
        ],
        name: "HashSet",
        type: "event",
      },
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

  const handleDownload = async () => {
    if (!downloadHash) {
      setDownloadMessage("Please enter a valid IPFS hash.");
      return;
    }

    try {
      const response = await fetch(
        `https://gateway.pinata.cloud/ipfs/${downloadHash}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch file from IPFS");
      }

      const fileContent = await response.text();
      const blob = new Blob([fileContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "downloaded_file.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadMessage("File downloaded successfully.");
    } catch (error) {
      setDownloadMessage("Failed to download file: " + error.message);
    }
  };

  const handleConvertAndStoreJson = () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file to convert and store as JSON.");
      return;
    }

    if (!factoryName) {
      setUploadMessage("Please select a factory name.");
      return;
    }

    setIsConverting(true);
  };

  const factoryOptions = [
    { value: "", label: "Select Factory" },
    { value: "Agriculture", label: "Agriculture, forestry and fishing" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Construction", label: "Construction" },
    { value: "Transport", label: "Transport and storage" },
    { value: "Mining", label: "Mining and quarrying" },
  ];

  return (
    <div className="upload-container">
      {isUploadMode ? (
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
          <div className="button-group">
            <button type="submit" className="button">
              Upload
            </button>
            <button
              type="button"
              onClick={() => setIsUploadMode(false)}
              className="button"
            >
              Download
            </button>
            <button
              type="button"
              onClick={handleConvertAndStoreJson}
              className="button"
            >
              Convert and Store JSON
            </button>
          </div>
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
      ) : (
        <div className="download-section">
          <label htmlFor="ipfs-hash" className="ipfs-hash">
            <p>Enter IPFS Hash:</p>
            <input
              type="text"
              id="ipfs-hash"
              value={downloadHash}
              onChange={(e) => setDownloadHash(e.target.value)}
            />
          </label>
          <br />
          <div className="button-group">
            <button
              type="button"
              onClick={() => setIsUploadMode(true)}
              className="button"
            >
              Upload
            </button>
            <button type="button" onClick={handleDownload} className="button">
              Download
            </button>
          </div>
          {downloadMessage && (
            <p className="download-message">{downloadMessage}</p>
          )}
        </div>
      )}
      {isConverting && (
        <JsonConverter
          file={selectedFile}
          factoryName={factoryName}
          onConversionComplete={(message) => {
            setUploadMessage(message);
            setIsConverting(false);
          }}
        />
      )}
    </div>
  );
}

export default Upload;
