/**
 * Draw.io Plugin to create OPM Diagramms
 * This is still work in progress.
 *
 * LOAD library by rawgit reference:
 *
  * https://rawgit.com/brendanhall/opm-drawio/master/opm-drawio.js
 * Based on original C4 example by  Tobias Hochgürtel
 * https://raw.githubusercontent.com/tobiashochguertel/draw-io/master/C4-drawIO.xml
 */
Draw.loadPlugin(function (ui) {
     var sidebar_id = 'opm';
    var sidebar_title = 'OPM Notation';

    var opmUtils = {};
    opmUtils.is = function (cell) {
        return (cell &&
            cell.hasOwnProperty('') &&
            (cell.opm !== null));
    };
    opmUtils.isModel = function (cell) {
        return (opmUtils.is(cell) &&
            cell &&
            cell.hasOwnProperty('value') &&
            (cell.value &&
                cell.value.hasAttribute('opmType'))
        );
    };
    
    opmUtils.registCodec = function (func) {
        var codec = new mxObjectCodec(new func());
        codec.encode = function (enc, obj) {
            try {
                var data = enc.document.createElement(func.name);
            } catch (e) {
                (window.console && console.error(e));
            }
            return data
        };
        codec.decode = function (dec, node, into) {
            return new func();
        };
        mxCodecRegistry.register(codec);
    };

    opmStateHandler = function (state) {
        mxVertexHandler.apply(this, arguments);
    };
    opmStateHandler.prototype = new mxVertexHandler();
    opmStateHandler.prototype.constructor = opmStateHandler;
    opmStateHandler.prototype.domNode = null;
    opmStateHandler.prototype.init = function () {
        mxVertexHandler.prototype.init.apply(this, arguments);
        this.domNode = document.createElement('div');
        this.domNode.style.position = 'absolute';
        this.domNode.style.whiteSpace = 'nowrap';
        if (this.custom) this.custom.apply(this, arguments);
        var img = opmUtils.createSettingsIcon();
        mxEvent.addGestureListeners(img,
            mxUtils.bind(this, function (evt) {
                mxEvent.consume(evt);
            })
        );
        this.domNode.appendChild(img);
        this.graph.container.appendChild(this.domNode);
        this.redrawTools();
    };
    opmStateHandler.prototype.redraw = function () {
        mxVertexHandler.prototype.redraw.apply(this);
        this.redrawTools();
    };
    opmStateHandler.prototype.redrawTools = function () {
        if (this.state !== null && this.domNode !== null) {
            var dy = (mxClient.IS_VML && document.compatMode === 'CSS1Compat') ? 20 : 4;
            this.domNode.style.left = (this.state.x + this.state.width - this.domNode.children.length * 14) + 'px';
            this.domNode.style.top = (this.state.y + this.state.height + dy) + 'px';
        }
    };
    opmStateHandler.prototype.destroy = function (sender, me) {
        mxVertexHandler.prototype.destroy.apply(this, arguments);
        if (this.domNode !== null) {
            this.domNode.parentNode.removeChild(this.domNode);
            this.domNode = null;
        }
    };

    
    opmRelationship = function () {
    };
    opmRelationship.prototype.handler = opmStateHandler;
    opmRelationship.prototype.create = function () {
        var label = '<div style="text-align: left"><div style="text-align: center">Relationship</div>;'
        var cell = new mxCell('', new mxGeometry(0, 0, 160, 0), 'edgeStyle=none;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#6c8ebf;strokeWidth=2;fontColor=#000000;jumpStyle=none;dashed=0;');
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.geometry.setTerminalPoint(new mxPoint(0, 0), true);
        cell.geometry.setTerminalPoint(new mxPoint(160, 0), false);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.value.setAttribute('label', label);
        cell.value.setAttribute('opmType', 'Relationship');
        cell.opm = this;
        return cell;
    };
    opmUtils.registCodec(opmRelationship);


 opmInstrumentHandles = function () {
    };
    opmInstrumentHandles.prototype.handler = opmStateHandler;
    opmInstrumentHandles.prototype.create = function () {
        var label = '<div style="text-align: left"><div style="text-align: center"><b></b></div><div style="text-align: center"></div></div>';
        var cell = new mxCell('', new mxGeometry(0, 0, 160, 0), 'edgeStyle=none;endArrow=circle;endSize=14;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#6c8ebf;strokeWidth=2;fontColor=#000000;jumpStyle=none;dashed=0;');
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.geometry.setTerminalPoint(new mxPoint(0, 0), true);
        cell.geometry.setTerminalPoint(new mxPoint(160, 0), false);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.value.setAttribute('label', label);
        cell.value.setAttribute('opmType', 'InstrumentHandles');
        cell.opm = this;
        return cell;
    };
    opmUtils.registCodec(opmInstrumentHandles);


 opmAgentHandles = function () {
    };
    opmAgentHandles.prototype.handler = opmStateHandler;
    opmAgentHandles.prototype.create = function () {
        var label = '<div style="text-align: left"><div style="text-align: center"><b></b></div><div style="text-align: center"></div></div>';
        var cell = new mxCell('', new mxGeometry(0, 0, 160, 0), 'edgeStyle=none;endArrow=circle;startFill=0;endFill=0;startSize=14;endSize=14;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#6c8ebf;strokeWidth=2;fontColor=#000000;jumpStyle=none;dashed=0;');
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.geometry.setTerminalPoint(new mxPoint(0, 0), true);
        cell.geometry.setTerminalPoint(new mxPoint(160, 0), false);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.value.setAttribute('label', label);
        cell.value.setAttribute('opmType', 'AgentHandles');
        cell.opm = this;
        return cell;
    };
    opmUtils.registCodec(opmAgentHandles);


opmRelationship4 = function () {
    };
    opmRelationship4.prototype.handler = opmStateHandler;
    opmRelationship4.prototype.create = function () {
        var label = '<div style="text-align: left"><div style="text-align: center"><b></b></div><div style="text-align: center"></div></div>';
        var cell = new mxCell('', new mxGeometry(0, 0, 160, 0), 'edgeStyle=none;endArrow=classic;startFill=0;endFill=0;endSize=14;startSize=14;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#6c8ebf;strokeWidth=2;fontColor=#000000;jumpStyle=none;dashed=0;');
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.geometry.setTerminalPoint(new mxPoint(0, 0), true);
        cell.geometry.setTerminalPoint(new mxPoint(160, 0), false);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.value.setAttribute('label', label);
        cell.value.setAttribute('opmType', 'Relationship4');
       
        cell.opm = this;
        return cell;
    };
    opmUtils.registCodec(opmRelationship4);



opmAffects = function () {
    };
    opmAffects.prototype.handler = opmStateHandler;
    opmAffects.prototype.create = function () {
        var label = '<div style="text-align: left"><div style="text-align: center"><b></b></div><div style="text-align: center"></div></div>';
        var cell = new mxCell('', new mxGeometry(0, 0, 160, 0), 'edgeStyle=none;endArrow=classic;startArrow=classic;startFill=0;endFill=0;endSize=14;startSize=14;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#6c8ebf;strokeWidth=2;fontColor=#000000;jumpStyle=none;dashed=0;');
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.geometry.setTerminalPoint(new mxPoint(0, 0), true);
        cell.geometry.setTerminalPoint(new mxPoint(160, 0), false);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.value.setAttribute('label', label);
        cell.value.setAttribute('opmType', 'Affects');
        cell.opm = this;
        return cell;
    };
    opmUtils.registCodec(opmAffects);

BiReflective = function () {
    };
    BiReflective.prototype.handler = opmStateHandler;
    BiReflective.prototype.create = function () {
        var label = '<div style="text-align: left"><div style="text-align: center">Releationship</div><div style="text-align: center"></div>Inverse Relationship</div>';
        var cell = new mxCell('', new mxGeometry(0, 0, 160, 0), 'edgeStyle=none;endArrow=open;startArrow=open;startFill=0;endFill=0;endSize=14;startSize=14;rounded=0;html=1;entryX=0;entryY=0.5;jettySize=auto;orthogonalLoop=1;strokeColor=#6c8ebf;strokeWidth=2;fontColor=#000000;jumpStyle=none;dashed=0;');
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.geometry.setTerminalPoint(new mxPoint(0, 0), true);
        cell.geometry.setTerminalPoint(new mxPoint(160, 0), false);
        cell.geometry.relative = true;
        cell.edge = true;
        cell.value.setAttribute('label', label);
        cell.value.setAttribute('opmType', 'BiReflective Relationship');
        cell.opm = this;
        return cell;
    };
    opmUtils.registCodec(BiReflective);


    opmObject = function () {
    };
    opmObject.prototype.handler = opmStateHandler;
    opmObject.prototype.create = function () {
        var cell = new mxCell('', new mxGeometry(0, 70, 160, 110), 'rounded=0;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#dae8fc;fontColor=#000000;align=center;arcSize=7;strokeColor=#6c8ebf;');
       //  'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#ffffff;fontColor=#000000;align=left;arcSize=3;strokeColor=#000000;verticalAlign=bottom;');
        cell.setVertex(true);
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.setAttribute('label', '<div style="text-align: left">Object</div>');
        cell.setAttribute('placeholders', '1');
        cell.setAttribute('opmName', 'Object');
        cell.setAttribute('opmType', 'opmObject');
        cell.opm = this;
        return cell;
    };
    opmUtils.registCodec(opmObject);

    opmObjectE = function () {
    };
    opmObjectE.prototype.handler = opmStateHandler;
    opmObjectE.prototype.create = function () {
        var cell = new mxCell('', new mxGeometry(0, 70, 160, 110), 'rounded=0;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#dae8fc;fontColor=#000000;align=center;arcSize=7;strokeColor=#6c8ebf;dashed=1');
        // 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#ffffff;fontColor=#000000;align=left;arcSize=3;strokeColor=#000000;verticalAlign=bottom;dashed=1');
        cell.setVertex(true);
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.setAttribute('label', '<div style="text-align: left">Object</div>');
        cell.setAttribute('placeholders', '1');
        cell.setAttribute('opmName', 'Object');
        cell.setAttribute('opmType', 'opmObjectE');
        cell.opm = this;
        return cell;
    };
    opmUtils.registCodec(opmObjectE);


    opmObjectP = function () {
    };
    opmObjectP.prototype.handler = opmStateHandler;
    opmObjectP.prototype.create = function () {
        var cell = new mxCell('', new mxGeometry(0, 70, 160, 110), 'rounded=0;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#dae8fc;fontColor=#000000;align=center;arcSize=7;strokeColor=#6c8ebf;shadow=1');
        // 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#ffffff;fontColor=#000000;align=left;arcSize=3;strokeColor=#000000;verticalAlign=bottom;shadow=1');
        cell.setVertex(true);
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.setAttribute('label', '<div style="text-align: left">Object</div>');
        cell.setAttribute('placeholders', '1');
        cell.setAttribute('opmName', 'Object');
        cell.setAttribute('opmType', 'opmObjectP');
        cell.opm = this;
        return cell;
    };

    opmUtils.registCodec(opmObjectP);

    opmState = function () {
    };
    opmState.prototype.handler = opmStateHandler;
    opmState.prototype.create = function () {
        var cell = new mxCell('', new mxGeometry(0, 70, 160, 110), 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#dae8fc;fontColor=#000000;align=center;arcSize=7;strokeColor=#6c8ebf;shadow=0');
        // 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#ffffff;fontColor=#000000;align=left;arcSize=3;strokeColor=#000000;verticalAlign=bottom;shadow=1');
        cell.setVertex(true);
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.setAttribute('label', '<div style="text-align: left">State</div>');
        cell.setAttribute('placeholders', '1');
        cell.setAttribute('opmName', 'State');
        cell.setAttribute('opmType', 'opmState');
        cell.opm = this;
        return cell;
    };

    opmUtils.registCodec(opmState);

opmProcess = function () {
    };
    opmProcess.prototype.handler = opmStateHandler;
    opmProcess.prototype.create = function () {
        var cell = new mxCell('', new mxGeometry(0, 70, 160, 110), 'ellipse;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#dae8fc;fontColor=#000000;align=center;arcSize=7;strokeColor=#6c8ebf;');
       //  'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#ffffff;fontColor=#000000;align=left;arcSize=3;strokeColor=#000000;verticalAlign=bottom;');
        cell.setVertex(true);
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.setAttribute('label', '<div style="text-align: left">Process</div>');
        cell.setAttribute('placeholders', '1');
        cell.setAttribute('opmName', 'Process');
        cell.setAttribute('opmType', 'opmProcess');
        cell.opm = this;
        return cell;
    };
    opmUtils.registCodec(opmProcess);

    opmProcessE = function () {
    };
    opmProcessE.prototype.handler = opmStateHandler;
    opmProcessE.prototype.create = function () {
        var cell = new mxCell('', new mxGeometry(0, 70, 160, 110), 'ellipse;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#dae8fc;fontColor=#000000;align=center;arcSize=7;strokeColor=#6c8ebf;dashed=1');
        // 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#ffffff;fontColor=#000000;align=left;arcSize=3;strokeColor=#000000;verticalAlign=bottom;dashed=1');
        cell.setVertex(true);
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.setAttribute('label', '<div style="text-align: left">Process</div>');
        cell.setAttribute('placeholders', '1');
        cell.setAttribute('opmName', 'Process');
        cell.setAttribute('opmType', 'opmProcessE');

        cell.opm = this;
        return cell;
    };
    opmUtils.registCodec(opmProcessE);


    opmProcessP = function () {
    };
    opmProcessP.prototype.handler = opmStateHandler;
    opmProcessP.prototype.create = function () {
        var cell = new mxCell('', new mxGeometry(0, 70, 160, 110), 'ellipse;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#dae8fc;fontColor=#000000;align=center;arcSize=7;strokeColor=#6c8ebf;shadow=1');
        // 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#ffffff;fontColor=#000000;align=left;arcSize=3;strokeColor=#000000;verticalAlign=bottom;shadow=1');
        cell.setVertex(true);
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
        cell.setAttribute('label', '<div style="text-align: left">Process</div>');
        cell.setAttribute('placeholders', '1');
        cell.setAttribute('opmName', 'Process');
        cell.setAttribute('opmType', 'opmProcessP');
        cell.opm = this;
        return cell;
    };
    opmUtils.registCodec(opmProcessP);


    opmExibbits = function () {
    };
    opmExibbits.prototype.handler = opmStateHandler;
    opmExibbits.prototype.create = function () {
        var cell = new mxCell('', new mxGeometry(0, 70, 160, 110), 'shape=stencil(tVXbToQwEP2avprCLOuzQf2PCkWaZVtSqrv+vUOHjSKlgGhD0syZnrn1AAzyrhatZCkXXSsLx+CRpWmlrrLEHeGakIRzsi8/7M5Zc5IXVbrhpNK1tMr1Xnhi/AHP9A/khdEaMyiju5Hnmx+DCaWRy68UjN9llOZjsMlqMcNZOmmHYjz6/OuoyeqokCMy1wjkL6I4vVrzpstgLTSrwjTGIkC7T8VS4H5FGqlU04SplV8Raiv6y5k4bu6zeZdfw8l4YOKhuDd6o/Q8HZb50fTHnfmTyExXFbCigXEBsLOB+78dQKR+L+aJNjw6I2RUobEyovBepKTy/9DiYessDmN+lm3kH3fyt9c//5YvfR9Cd7l8LZ43uVSP0o/BA58=);');
        // 'rounded=1;whiteSpace=wrap;html=1;labelBackgroundColor=none;fillColor=#ffffff;fontColor=#000000;align=left;arcSize=3;strokeColor=#000000;verticalAlign=bottom;shadow=1');
        cell.setVertex(true);
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
       // cell.setAttribute('label', '<div style="text-align: left">hostname</div>');
        cell.setAttribute('placeholders', '1');
       // cell.setAttribute('opmName', 'Process');
        cell.setAttribute('opmType', 'opmExibbits');
        cell.opm = this;
        return cell;
    };
    opmUtils.registCodec(opmExibbits);

   opmInstance = function () {
    };
    opmInstance.prototype.handler = opmStateHandler;
    opmInstance.prototype.create = function () {
        var cell = new mxCell('', new mxGeometry(0, 70, 160, 110),'shape=stencil(rVTtTsMgFH0a/hoKq/42Vd8D21tLxoAAc/Pt5WtxXVtanaQJuedyv04PINrYgWlABDOroXWIviBCen6Gzu8eHhJSYZzs041tnVF7OPHO5ZNcDmC4C176ivCzPxM+2rRKSl+BK2lHniu/T8a49LH4nJLhhzqV+cp2srSvcAAHJjcT0bc/Z602Z6WNR5YGoc07a/cfRh1lN9tL4qpVQhkPpD2WQoTiuAqD9FyI+dA+rkKoZuHnTBwX90F9wg85NZ5hfC7vJVxwuRxO1+OL5R/vrF8VON3UwIYBxg3QOwd4+l8CCv1HMU+0EdEFIXsVKgMFhQeRJpX/XsarNwCE4NrC1aNUj9+kbGYiduTmmu8yM6GF9YdjeZTI0ISIiKbHNALf);');
            //'shape=stencil(rVTbTsMwDP2avKK01uAZFfiP0Lo0WpdUacbG3+PanWA0DRUjqhT5+HJs9ygKqrEzA6pSm3HAOip4UmXZ2jM2dBPcCVJoLfbphz3G4Pd4sk2cI63rMNg4eeFZ6UeKmT6oau8cMVjvxivPNz8VM9ZRrj5LMX23E5qP2RZrIIYDRgxzM4y+/LlqsbkqVISsDQLVq6n3b8EfXZPsRXZV+94HAuRmKlWC5pMZpLV9n05t+WRSBzP9nIXj4j74d/xazk4nNp6qe0nvrVtPh9/zs/T3N/IXmZ1uamDDANcNwI0DPPzvAjL9s5gX2mB0RcikQh8wo/BJpKLynIzTEUy8qM+ovFEMfAI=)');
        //    'shape=stencil(rVTtTsMgFH0a/hoKq/42Vd8D21tLxoAAc/Pt5WtxXVtanaQJuedyv04PINrYgWlABDOroXWIviBCen6Gzu8eHhJSYZzs041tnVF7OPHO5ZNcDmopmC176ivCzPxM+2rRKSl+BK2lHniu/T8a49LH4nJLhhzqV+cp2srSvcAAHJjcT0bc/Z602Z6WNR5YGoc07a/cfRh1lN9tL4qpVQhkPpD2WQoTiuAqD9FyI+dA+rkKoZuHnTBwX90F9wg85NZ5hfC7vJVxwuRxO1+OL5R/vrF8VON3UwIYBxg3QOwd4+l8CCv1HMU+0EdEFIXsVKgMFhQeRJpX/XsarNwCE4NrC1aNUj9+kbGYiduTmmu8yM6GF9YdjeZTI0ISIiKbHNALf);');
       //         pe=stencil(rVTtTsMgFH0a/hoKq/42Vd8D21tLxoAAc/Pt5WtxXVtanaQJuedyv04PINrYgWlABDOroXWIviBCen6Gzu8eHhJSYZzs041tnVF7OPHO5ZNcDmC4C176ivCzPxM+2rRKSl+BK2lHniu/T8a49LH4nJLhhzqV+cp2srSvcAAHJjcT0bc/Z602Z6WNR5YGoc07a/cfRh1lN9tL4qpVQhkPpD2WQoTiuAqD9FyI+dA+rkKoZuHnTBwX90F9wg85NZ5hfC7vJVxwuRxO1+OL5R/vrF8VON3UwIYBxg3QOwd4+l8CCv1HMU+0EdEFIXsVKgMFhQeRJpX/XsarNwCE4NrC1aNUj9+kbGYiduTmmu8yM6GF9YdjeZTI0ISIiKbHNALf);
        cell.setVertex(true);
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
       // cell.setAttribute('label', '<div style="text-align: left">hostname</div>');
        cell.setAttribute('placeholders', '1');
       // cell.setAttribute('opmName', 'Process');
        cell.setAttribute('opmType', 'opmInstance');
        cell.opm = this;
        return cell;
    };
    opmUtils.registCodec(opmInstance);

   opmGeneralize = function () {
    };
    opmGeneralize.prototype.handler = opmStateHandler;
    opmGeneralize.prototype.create = function () {
        var cell = new mxCell('', new mxGeometry(0, 70, 160, 110),'shape=stencil(rVTbTsMwDP2avKK01uAZFfiP0Lo0WpdUacbG3+PanWA0DRUjqhT5+HJs9ygKqrEzA6pSm3HAOip4UmXZ2jM2dBPcCVJoLfbphz3G4Pd4sk2cI63rMNg4eeFZ6UeKmT6oau8cMVjvxivPNz8VM9ZRrj5LMX23E5qP2RZrIIYDRgxzM4y+/LlqsbkqVISsDQLVq6n3b8EfXZPsRXZV+94HAuRmKlWC5pMZpLV9n05t+WRSBzP9nIXj4j74d/xazk4nNp6qe0nvrVtPh9/zs/T3N/IXmZ1uamDDANcNwI0DPPzvAjL9s5gX2mB0RcikQh8wo/BJpKLynIzTEUy8qM+ovFEMfAI=)');

            cell.setVertex(true);
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
       // cell.setAttribute('label', '<div style="text-align: left">hostname</div>');
        cell.setAttribute('placeholders', '1');
       // cell.setAttribute('opmName', 'Process');
        cell.setAttribute('opmType', 'opmGeneralize');
        cell.opm = this;
        return cell;
    };
    opmUtils.registCodec(opmGeneralize);

opmAggregate = function () {
    };
    opmAggregate.prototype.handler = opmStateHandler;
    opmAggregate.prototype.create = function () {
        var cell = new mxCell('', new mxGeometry(0, 70, 160, 110),'shape=stencil(rVTtroIwDH2a/TWDRv1tuN73mFBlETcy5tfbW1aMH8Au0UtIlp6u57TlBAFZU6oaRSpVU2PuBfyINN3qCxZ0ElwykkjJ8fktbryzezzrwnc3tSnRad9mYS3kiu60L2S5NYYUtDXNS+YpT2RKG6qVFyaTsznLXLuYo5oUDujRdc0E9Pdj1mQyK2SEjA0C2Ubl+52zR1MM9sK7ym1lHQF8BimRggxPZJCtrqpIaaSyVu236SXu6YM94WM3czmw8CHee3mlzXg5/F0flV98qZ9EFjOpgQkDvDYAXw6w/N8FRPoPXu55I6AjPiYTWocRg7ceZZPHXDx8Iwj3+APKv6gA3AA=)');
        cell.setVertex(true);
        cell.setValue(mxUtils.createXmlDocument().createElement('object'));
       // cell.setAttribute('label', '<div style="text-align: left">hostname</div>');
        cell.setAttribute('placeholders', '1');
        cell.setAttribute('opmType', 'opmAggregate');
        cell.opm = this;
        return cell;
    };
    opmUtils.registCodec(opmAggregate);
        

    // Adds custom sidebar entry
    ui.sidebar.addPalette(sidebar_id, sidebar_title, true, function (content) {
        var verticies = [opmObject,opmObjectP,opmObjectE,opmState,opmProcess,opmProcessP,opmProcessE,opmExibbits,opmInstance,opmGeneralize,opmAggregate];
        //opmPerson, opmSoftwareSystem, opmContainer, opmComponent, opmExecutionEnvironment, opmDeploymentNode, opmDatabase,
        for (var i in verticies) {
            var cell = verticies[i].prototype.create();
            content.appendChild(ui.sidebar.createVertexTemplateFromCells([cell], cell.geometry.width, cell.geometry.height, cell.label));
        }
        content.appendChild(ui.sidebar.createEdgeTemplateFromCells([opmRelationship.prototype.create()], 160, 0, 'Relationship'));
        content.appendChild(ui.sidebar.createEdgeTemplateFromCells([opmInstrumentHandles.prototype.create()], 160, 0, 'Instrument Handler'));
        content.appendChild(ui.sidebar.createEdgeTemplateFromCells([opmAgentHandles.prototype.create()], 160, 0, 'Agent Handler'));
        content.appendChild(ui.sidebar.createEdgeTemplateFromCells([opmRelationship4.prototype.create()], 160, 0, 'C4 Relationship4'));
        content.appendChild(ui.sidebar.createEdgeTemplateFromCells([opmAffects.prototype.create()], 160, 0, 'Affects'));
        content.appendChild(ui.sidebar.createEdgeTemplateFromCells([BiReflective.prototype.create()], 160, 0, 'Bireflective Analysis'));
   
        // , C4DynamicRelationship];
    });

    // Add custom handler-code for the event of data-editor instanzing to provide a custom data-editor dialog.
    /*origGraphCreateHander = ui.editor.graph.createHandler;
     
       ui.editor.graph.createHandler = function (state) {
        console.log(state.cell);
        console.log(opmUtils.isRelationship(state.cell));
        console.log(this);
        if (state !== null && (this.getSelectionCells().length === 1) && opmUtils.is(state.cell) && state.cell.c4.handler
            && !opmUtils.isRelationship(state.cell) 
            && !opmUtils.isRelationship2(state.cell)
            && !opmUtils.isRelationship3(state.cell)
            && !opmUtils.isRelationship4(state.cell)
            && !opmUtils.isRelationship5(state.cell)
            && !opmUtils.isRelationship6(state.cell)) {
            return new state.cell.c4.handler(state);
        }  
        return origGraphCreateHander.apply(this, arguments);
    };*/
});
