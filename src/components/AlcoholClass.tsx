import "../App.css";
import { useEffect, useState } from "react";
import { calculateMedian, calculateMode, groupByKey } from "../utils";
import data from "../data.json";

export const AlcoholClass = () => {
  // defining constants
  const FlavanoidsKey = "Flavanoids";
  const AlcoholKey = "Alcohol";

  //   defining state variables
  const [meanData, setMeanData] = useState<Record<any, number>>({});
  const [medianData, setMedianData] = useState<Record<any, number>>({});
  const [modeData, setModeData] = useState<Record<any, number>>({});
  const [calculatedData, setCalculatedData] = useState<any[]>([]);

  // run on initial call
  useEffect(() => {
    calculateMeanData(data, FlavanoidsKey);
    calculateMedianData(data, AlcoholKey, FlavanoidsKey);
    calculateModeData(data, AlcoholKey, FlavanoidsKey);
  }, []);

  // run on change of medianData, meanData, modeData
  useEffect(() => {
    storeCalculatedData();
  }, [medianData, meanData, modeData]);

  //  function for sorting mean, median and mode in state variable
  const storeCalculatedData = () => {
    let tempFinalData = [];
    tempFinalData.push({ Mean: meanData });
    tempFinalData.push({ Median: medianData });
    tempFinalData.push({ Mode: modeData });
    setCalculatedData(tempFinalData);
  };

  //  function for calculating mean
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
    setMeanData(result);
  };

  //  function for calculating median
  const calculateMedianData = (
    medianDataSet: any,
    key: string,
    medianKey: string
  ) => {
    const finalData = groupByKey(medianDataSet, key);
    Object.keys(finalData).map((item) => {
      let median = calculateMedian(finalData[item], medianKey);
      let finalMedianData = Object.assign(medianData, {
        [item]: median,
      });

      setMedianData(finalMedianData);
    });
  };

  //  function for calculating mode
  const calculateModeData = (data: any, key: string, modeKey: string) => {
    const finalData = groupByKey(data, key);

    Object.keys(finalData).map((item) => {
      let mode = calculateMode(finalData[item], modeKey);
      let finalModeData = Object.assign(modeData, {
        [item]: mode,
      });

      setModeData(finalModeData);
    });
  };

  return (
    <div className="section">
      {calculatedData?.length && (
        <table key="Flavanoids">
          <tr>
            <th>Measure</th>
            <th>Class 1</th>
            <th>Class 2</th>
            <th>Class 3</th>
          </tr>
          <tr>
            <th>Flavanoids Mean</th>
            {calculatedData?.length &&
              Object.keys(calculatedData[0]["Mean"]).map((item: any) => (
                <td>{calculatedData[0]["Mean"][item]?.toFixed(3)}</td>
              ))}
          </tr>
          <tr>
            <th>Flavanoids Median</th>
            {calculatedData?.length &&
              Object.keys(calculatedData[1]["Median"]).map((item: any) => (
                <td>{calculatedData[1]["Median"][item]?.toFixed(3)}</td>
              ))}
          </tr>
          <tr>
            <th>Flavanoids Mode</th>
            {calculatedData?.length &&
              Object.keys(calculatedData[2]["Mode"]).map((item: any) => (
                <td>
                  {calculatedData[2]["Mode"][item].length
                    ? calculatedData[2]["Mode"][item]
                        ?.map((data: number) => Number(data).toFixed(3))
                        ?.join(", ")
                    : "-"}
                </td>
              ))}
          </tr>
        </table>
      )}
    </div>
  );
};
