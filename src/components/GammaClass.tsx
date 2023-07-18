import "../App.css";
import { useEffect, useState } from "react";
import { calculateMedian, calculateMode, groupByKey } from "../utils";
import data from "../data.json";

export const GammaClass = () => {
  // defining constants
  const AlcoholKey = "Alcohol";
  const GammaKey = "Gamma";

  //   defining state variables
  const [gammaCalculatedData, setGammaCalculatedData] = useState<any[]>([]);
  const [gammaData, setGammaData] = useState<any[]>([]);
  const [gammaMeanData, setGammaMeanData] = useState<Record<any, number>>({});
  const [gammaMedianData, setGammaMedianData] = useState<Record<any, number>>(
    {}
  );
  const [gammaModeData, setGammaModeData] = useState<Record<any, number>>({});

  // run on initial call
  useEffect(() => {
    addGamma();
  }, []);

  // run on change of gammaData

  useEffect(() => {
    if (gammaData.length) {
      calculateMeanData(gammaData, GammaKey);
      calculateMedianData(gammaData, AlcoholKey, GammaKey);
      calculateModeData(gammaData, AlcoholKey, GammaKey);
    }
  }, [gammaData]);

  // run on change of gammaMeanData, gammaMedianData, gammaModeData, gammaData
  useEffect(() => {
    storeGammaCalculatedData();
  }, [gammaMeanData, gammaMedianData, gammaModeData, gammaData]);

  //  function for sorting mean, median and mode in state variable
  const storeGammaCalculatedData = () => {
    let tempGammaFinalData = [];
    tempGammaFinalData.push({ GammaMean: gammaMeanData });
    tempGammaFinalData.push({ GammaMedian: gammaMedianData });
    tempGammaFinalData.push({ GammaMode: gammaModeData });
    setGammaCalculatedData(tempGammaFinalData);
  };

  //   function for calculating mean
  const calculateMeanData = (data: any, meanKey: string) => {
    const result: Record<any, number> = {};
    Object.values(
      data.reduce((acc: any, current: any) => {
        acc[current.Alcohol] = acc[current.Alcohol] || { count: 0, total: 0 };
        acc[current.Alcohol].total += current[meanKey];

        acc[current.Alcohol].count += 1;
        acc[current.Alcohol].name = current.Alcohol;
        return acc;
      }, {})
    ).forEach((item: any) => {
      result[item.name] = item.total / item.count;
    });
    setGammaMeanData(result);
  };

  //   function for calculating median
  const calculateMedianData = (
    medianDataSet: any,
    key: string,
    medianKey: string
  ) => {
    const finalData = groupByKey(medianDataSet, key);
    const result: Record<any, number> = {};
    Object.keys(finalData).map((item) => {
      let median = calculateMedian(finalData[item], medianKey);
      let finalMedianData = Object.assign(gammaMedianData, {
        [item]: median,
      });

      Object.assign(result, finalMedianData);

      setGammaMedianData(finalMedianData);
    });
  };

  //   function for calculating mode
  const calculateModeData = (data: any, key: string, modeKey: string) => {
    const finalData = groupByKey(data, key);
    const result: Record<any, number> = {};

    Object.keys(finalData).map((item) => {
      let mode = calculateMode(finalData[item], modeKey);
      let finalModeData = Object.assign(gammaModeData, {
        [item]: mode,
      });

      Object.assign(result, finalModeData);

      setGammaModeData(finalModeData);
    });
  };

  //   function for calculating gamma using Gamma = (Ash * Hue) / Magnesium.
  const addGamma = () => {
    const dataVisualization = [...data];
    dataVisualization.forEach(function (element: any) {
      element.Gamma = (element["Ash"] * element["Hue"]) / element["Magnesium"];
    });
    setGammaData(dataVisualization);
  };

  return (
    <div className="section">
      {gammaCalculatedData?.length && (
        <table key="Gamma">
          <tr>
            <th>Measure</th>
            <th>Class 1</th>
            <th>Class 2</th>
            <th>Class 3</th>
          </tr>
          <tr>
            <th>Gamma Mean</th>
            {gammaCalculatedData?.length &&
              Object.keys(gammaCalculatedData[0]["GammaMean"]).map(
                (item: any) => (
                  <td>
                    {gammaCalculatedData[0]["GammaMean"][item]?.toFixed(3)}
                  </td>
                )
              )}
          </tr>
          <tr>
            <th>Gamma Median</th>
            {gammaCalculatedData?.length &&
              Object.keys(gammaCalculatedData[1]["GammaMedian"]).map(
                (item: any) => (
                  <td>
                    {gammaCalculatedData[1]["GammaMedian"][item]?.toFixed(3)}
                  </td>
                )
              )}
          </tr>
          <tr>
            <th>Gamma Mode</th>
            {gammaCalculatedData?.length &&
              Object.keys(gammaCalculatedData[2]["GammaMode"]).map(
                (item: any) => (
                  <td>
                    {gammaCalculatedData[2]["GammaMode"][item]?.length
                      ? gammaCalculatedData[2]["GammaMode"][item]
                          ?.map((data: number) => Number(data).toFixed(3))
                          ?.join(", ")
                      : "-"}
                  </td>
                )
              )}
          </tr>
        </table>
      )}
    </div>
  );
};
