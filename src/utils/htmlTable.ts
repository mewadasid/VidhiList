import { useSelector } from 'react-redux';
import {vidhiThingsUseAll} from './cosntant';

const myList = useSelector((state: RootState) =>
  Object.values(state.list).find(singleList => singleList.listId === listId),
);

const html = `
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PDF VIDHILISt</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;1,800&family=Poppins&display=swap');

        * {
            margin: 0;
            box-sizing: border-box;
            font-family: 'Open Sans', sans-serif;
        }

        .table-wrapper {
          width: 1140px;
            margin: 0 auto;
        }
        
        table {
            border-collapse: collapse;
            background: #fff;
            border-radius: 10px;
            overflow: hidden;
            margin: auto;
            width: calc(100%/2);
            
            position: relative;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            top: 20px;
        }

        .header th {
            background-color: #A6E3E9;
            line-height: 2.5;
            text-align: center;
            font-size: 28px;
        }

        .data tr {
            height: 50px;
            text-align: center;
            font-size: 28px;
            line-height: 1.2;
            /* background-color: rgba(0, 0, 0, 0.24); */
        }

        tbody tr:nth-child(even) {
            background-color: #f5f5f5;
        }

        .single-row {
            position: relative;
            top: 0;
            left: 0;
        }

        .commonTable {
            width: 30%;
            height:350px;
            position: relative;
            top: 30px;
            line-height: 2.5;
            text-align: center
        }
        .commonTable tbody tr td{
          font-size:28px;
        }
        
    </style>
</head>
<div class="container">
    <div class="table-wrapper">
        <div class="table-main">
            <table>
                <thead class="header">
                    <tr>
                        <th>વસ્તુઓ</th>
                        <th> કેટલુ</th>
                    </tr>
                </thead>
                <tbody class="data">
                ${
                  myList &&
                  Object.keys(myList.vidhi_things).map(
                    key =>
                      `<tr>
                  <td>${key}</td>
                  <td>${myList.vidhi_things[key]}</td>
                  </tr>`,
                  )
                }
                </tbody>
              <div>
                <table class="commonTable">
                    <tbody class="single-row">
                    ${Object.values(vidhiThingsUseAll).map(
                      things =>
                        `<tr>
                      <td>${things}</td>
                     
                      </tr>`,
                    )}
                    </tbody>
                </table>
              </div>
            </table>
        </div>
    </div>
</div>

</body>

</html>`;
