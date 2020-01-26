
var _html5 = function() {
	try {
		if (!('open' in document.createElement('details'))) {
			var nodeList, node, i;
			
			//wait until document is actually ready...
			node = document.createTextNode("");
			document.body.appendChild(node);
			document.body.removeChild(node);
			
			nodeList = document.getElementsByTagName("summary");
			for (i = 0; i < nodeList.length; i++) {
				node = nodeList[i];
				if (!node._init) {
					node._init = true;
					node.addEventListener(
						"click",
						function(eve) {
							if (this.parentNode.hasAttribute("open")) {
								this.parentNode.removeAttribute("open");
							} else {
								this.parentNode.setAttribute("open", "open");
							}
							
							if (this.parentNode.hasAttribute("open")) {
								//this.nextSibling.style.removeProperty("display");
							} else {
								//this.nextSibling.style.setProperty("display", "none");
							}
						},
						false
					);
					if (!node.parentNode.hasAttribute("open")) {
						//node.nextSibling.style.setProperty("display", "none");
					}
				}
			}
		}
	} catch(e) {
	}
	try {
		if (window.location.hash) {
			var node, parentNode, id;
			id = window.location.hash.substr(1);
			if (node = document.getElementById(id)) {
				do {
					if (node.tagName === "details" && !node.hasAttribute("open")) {
						node.setAttribute("open", "open");
					}
				} while (node = node.parentNode);
			}
		}
	} catch(e) {
	}
};

_html5.call();

window.addEventListener(
	"DOMContentLoaded",
	_html5,
	false
);
window.addEventListener(
	"load",
	_html5,
	false
);
/*******************************************************************************
 * DOM v1.01 08.04.2014 © Daniel Schulz
 * 
 * 	Changelog:
 *		v1.01 08.04.2014
 *			console.log
 * 		v1.00 12.09.2012
 * 			initial release
 ******************************************************************************/

var DOM = {
	loadDocument : function(uri) {
		var retDoc, req;
		try {
			req = new XMLHttpRequest();
			req.open("GET", uri, false);
			if (req.overrideMimeType) {
				//req.overrideMimeType("application/xml; charset=UTF-8");
			}
			req.send();
			if (req.responseXML) {
				retDoc = req.responseXML;
			} else {
				//retDoc = this.loadXML(req.responseText);
				throw req.responseText;
			}
			retDoc.fileURI = uri;
		} catch (e) {
			console.log("Could not load XML ressource: %o", uri);
			console.log("Exception:%o", e);
			retDoc = false;
		}
		return retDoc;
	},
	saveDocument : function(uri, doc) {
		var ret, req;
		try {
			req = new XMLHttpRequest();
			req.open("POST", uri, false);
			//req.setRequestHeader("Content-Type", "application/xml");
			req.send(doc);
			ret = req.responseXML;
		} catch (e) {
			console.log("Could not save XML ressource: %o", uri);
			console.log("Exception:%o", e);
			ret = false;
		}
		return ret;
	},
	loadXML : function(xml) {
		var doc, parser;
		parser = new DOMParser();
		doc = parser.parseFromString(xml, "application/xml");
		if (doc.documentElement.namespaceURI === NS.MOZ_ERR_PARSE) {
			throw ""+doc.documentElement.textContent;
		}
		return doc;
	},
	saveXML : function(doc) {
		var xml, serializer;
		serializer = new XMLSerializer();
		xml = serializer.serializeToString(doc);
		return xml;
	}
};
// © 2013 Daniel Schulz

var NS = {
	XML				: "http://www.w3.org/XML/1998/namespace",
	HTML 			: "http://www.w3.org/1999/xhtml",
	SVG 			: "http://www.w3.org/2000/svg",
	XLINK 			: "http://www.w3.org/1999/xlink",
	XSL 			: "http://www.w3.org/1999/XSL/Transform",
	MOZ_XUL			: "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
	MOZ_ERR_PARSE 	: "http://www.mozilla.org/newlayout/xml/parsererror.xml",
	IBP				: "http://www.ibp-dresden.de",
	LLO				: "http://slothsoft.net",
	resolver : function(prefix) {
		return NS[prefix.toUpperCase()];
	},
	prefixer : function(uri) {
		var prefix, ret = "";
		for (prefix in NS) {
			if (NS[prefix] === uri) {
				ret = prefix;
				break;
			}
		}
		return ret.toLowerCase();
	},
};
/*******************************************************************************
 * XPath v1.01 08.04.2014 © Daniel Schulz
 * 
 * 	Changelog:
 *		v1.01 08.04.2014
 *			window.wgxpath
 * 		v1.00 02.08.2013
 * 			initial release
 ******************************************************************************/

var XPath = {
	evaluate : function(query, contextNode) {
		var ownerDoc, res, ret, tmp, isTextNode;
		if (contextNode instanceof Array) {
			ret = [];
			for (var i = 0; i < contextNode.length; i++) {
				res = this.evaluate(query, contextNode[i]);
				if (res instanceof Array) {
					ret = ret.concat(res);
				} else {
					ret.push(res);
				}
			}
			return ret;
		}
		try {
			ownerDoc = contextNode.nodeType === Node.DOCUMENT_NODE
				? contextNode
				: contextNode.ownerDocument;
			//use wgxpath
			if (window.wgxpath) {
				if (!window.document.evaluate) {
					window.wgxpath.install(window);
				}
				if (!ownerDoc.evaluate) {
					window.wgxpath.install( { document : ownerDoc } );
				}
			}
			//alert(ownerDoc + "\n" + ownerDoc.evaluate + "\n" + ownerDoc.selectNodes);
			isTextNode = false;
			if (contextNode.nodeType === Node.TEXT_NODE) {
				if (contextNode.nodeValue === "") {
					contextNode.nodeValue = " ";
					isTextNode = true;
				}
			}
			res = ownerDoc.evaluate(query, contextNode, NS.resolver, XPathResult.ANY_TYPE, null);
			switch (res.resultType) {
				case XPathResult.NUMBER_TYPE:
					ret = res.numberValue;
					break;
				case XPathResult.STRING_TYPE:
					ret = res.stringValue;
					break;
				case XPathResult.BOOLEAN_TYPE:
					ret = res.booleanValue;
					break;
				default:
					ret = [];
					while (tmp = res.iterateNext()) {
						ret.push(tmp);
					}
					break;
			}
			//window.console.log("XPath result type: %o (%o)", res.resultType, typeof ret);
			if (isTextNode) {
				contextNode.nodeValue = "";
			}
			return ret;
		} catch(e) {
			window.console.log("XPath error!");
			window.console.log("Query:%o", query);
			window.console.log("Context node:%o", contextNode);
			window.console.log("Exception:%o", e);
			throw e;
		}
	},
	createPath : function(contextNode) {
		var node, nodeList, i, ret = [""], tag, precedingList, followingList;
		nodeList = this.evaluate("ancestor-or-self::node()", contextNode);
		for (i = 0; i < nodeList.length; i++) {
			node = nodeList[i];
			switch (node.nodeType) {
				case node.TEXT_NODE:
					tag = "text()";
					break;
				case node.ELEMENT_NODE:
					tag = NS.prefixer(node.namespaceURI) + ":" + node.localName;
					break;
				default:
					tag = false;
					break;
			}
			if (tag) {
				precedingList = XPath.evaluate("preceding-sibling::" + tag, node);
				followingList = XPath.evaluate("following-sibling::" + tag, node);
				if (precedingList.length + followingList.length) {
					tag += "[" + (precedingList.length + 1) + "]";
				}
				ret.push(tag);
			}
		}
		return ret.join("/");
	},
};
/*******************************************************************************
 * XSLT v1.01 08.04.2014 © Daniel Schulz
 * 
 * 	Changelog:
 *		v1.01 08.04.2014
 *			console.log
 * 		v1.00 12.09.2012
 * 			initial release
 ******************************************************************************/

var XSLT = {
	transformToFragment : function(dataNode, templateDoc, ownerDoc) {
		var xslt,
			uri, tmpDoc, nodeList, node, i,
			retFragment = false;
		try {
			//xsl:import parsen, für Chrome+Safari
			while (node = XPath.evaluate("//xsl:import", templateDoc)[0]) {
				uri = node.getAttribute("href");
				if (tmpDoc = DOM.loadDocument(uri)) {
					nodeList = XPath.evaluate("/xsl:stylesheet/*", tmpDoc);
					for (i = 0; i < nodeList.length; i++) {
						node.parentNode.appendChild(templateDoc.importNode(nodeList[i], true));
					}
				}
				node.parentNode.removeChild(node);
			}
			if (window.XSLTProcessor) {
				xslt = new XSLTProcessor();
				xslt.importStylesheet(templateDoc);
				retFragment = xslt.transformToFragment(dataNode, ownerDoc);
				if (!retFragment) {
					throw "XSLTProcessor.transformToFragment returned null!";
				}
			} else if (window.ActiveXObject) {
				xslt = new ActiveXObject("Msxml2.XSLTemplate.6.0");
				//var xmlDoc = new ActiveXObject("Msxml2.DOMDocument");
				//var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
				xslt.stylesheet = templateDoc;
				xslt = xslt.createProcessor();
				xslt.input = dataNode;
				xslt.transform();
				retFragment = ownerDoc.importNode(xslProc.output, true);
				if (!retFragment) {
					throw "Msxml2.XSLTemplate.transform returned null!";
				}
			}
		} catch(e) {
			console.log("An error occured while attempting to XSL transform. :|");
			console.log("Data node:%o", dataNode);
			console.log("Template document:%o", templateDoc);
			console.log("Owner document:%o", ownerDoc);
			console.log("Exception:%o", e);
			retFragment = ownerDoc.createDocumentFragment();
		}
		return retFragment;
	},
	transformToNode : function(dataNode, templateDoc, ownerDoc) {
		return this.transformToFragment(dataNode, templateDoc, ownerDoc).firstChild;
	},
};
/*******************************************************************************
 * TouchAndDrag v1.00 24.09.2014 © Daniel Schulz
 *
 *	Uses touchstart, touchend and touchmove to simulate dragstart, dragend and dragmove
 *	Requires XPath
 * 
 * 	Changelog:
 * 		v1.00 24.09.2014
 * 			initial release
 ******************************************************************************/

addEventListener(
	"load",
	function(eve) {
		TouchAndDrag.init();
	},
	false
);

var TouchAndDrag = {
	init : function() {
		if (window.MutationObserver) {
			try {
				var observer;
				observer = new MutationObserver(
					function(mutationList) {
						for (var i = 0; i < mutationList.length; i++) {
							this._tad.install(mutationList[i].target);
						}
					}
				);
				observer._tad = this;
				observer.observe(
					document.body, {
						childList : true,
						subtree : true,
					}
				);
			} catch(e) {
				this._log(e);
			}
		} else {
			try {
				document.body._tad = this;
				document.body.addEventListener(
					"DOMSubtreeModified",
					function(eve) {
						if (eve.target && eve.target.nodeType === 1) {
							this._tad.install(eve.target);
						}
					},
					false
				);
			} catch(e) {
				this._log(e);
			}
		}
		
		this.install(document);
	},
	install : function(rootNode) {
		var nodeList, node, i, eveName;
		
		try {
			nodeList = XPath.evaluate(".//html:*[@draggable]", rootNode);
			for (i = 0; i < nodeList.length; i++) {
				node = nodeList[i];
				if (!node._tad) {
					node._tad = this;
					
					node.addEventListener(
						"touchstart",
						this.events.draggable.touchStart,
						false
					);
					node.addEventListener(
						"touchend",
						this.events.draggable.touchEnd,
						false
					);
					node.addEventListener(
						"touchmove",
						this.events.draggable.touchMove,
						false
					);
				}
			}
		} catch(e) {
			this._log(e);
		}
		
		/*
		nodeList = XPath.evaluate("//html:*[@dropzone]", document);
		for (i = 0; i < nodeList.length; i++) {
			node = nodeList[i];
			node._tad = this;
			
			node.addEventListener(
				"touch",
				function(eve) {
					try {
						eve.preventDefault();
					} catch(e) {
						alert(e);
					}
				},
				false
			);
		}
		//*/
	},
	events : {
		draggable : {
			touchStart : function(eve) {
				this._tad.startEvent(this, eve);
			},
			touchEnd : function(eve) {
				this._tad.endEvent(this, eve);
			},
			touchMove : function(eve) {
				this._tad.moveEvent(this, eve);
			},
		},
		dropzone : {
		},
	},
	startEvent : function(refNode, eve) {
		try {
			var touchList, touch, i, id;
			touchList = eve.changedTouches;
			for (i = 0; i < touchList.length; i++) {
				touch = touchList[i];
				id = touch.identifier;
				
				eve.preventDefault();
				
				this.dispatchDragEvent(refNode, "dragstart", eve, this.getDataTransfer(id));
			}
		} catch(e) {
			alert(e);
		}
	},
	endEvent : function(refNode, eve) {
		try {
			var touchList, touch, i, id;
			touchList = eve.changedTouches;
			for (i = 0; i < touchList.length; i++) {
				touch = touchList[i];
				id = touch.identifier;
				
				eve.preventDefault();
				
				this.dispatchDragEvent(document.elementFromPoint(touch.clientX, touch.clientY), "drop", eve, this.getDataTransfer(id));
				this.dispatchDragEvent(refNode, "dragend", eve, this.getDataTransfer(id));
				this.clearDataTransfer(id);
			}
		} catch(e) {
			alert(e);
		}
	},
	moveEvent : function(refNode, eve) {
		try {
			var touchList, touch, i, id;
			touchList = eve.changedTouches;
			for (i = 0; i < touchList.length; i++) {
				touch = touchList[i];
				id = touch.identifier;
				if (this.hasDataTransfer(id)) {
					eve.preventDefault();
					
					this.dispatchDragEvent(document.elementFromPoint(touch.clientX, touch.clientY), "dragover", eve, this.getDataTransfer(id));
				}
			}
		} catch(e) {
			alert(e);
		}
	},
	dispatchDragEvent : function(targetNode, eventType, refEvent, dataTransfer) {
		try {
			var newEvent, details, key;
			details = {};
			for (key in refEvent) {
				switch (typeof refEvent[key]) {
					case "string":
					case "boolean":
					case "number":
						details[key] = refEvent[key];
						break;
					case "function":
					case "object":
					case "undefined":
						break;
					default:
						alert(typeof refEvent[key]);
						break;
				}
			}
			
			newEvent = new CustomEvent(eventType, details);
			
			if (!newEvent.dataTransfer && dataTransfer) {
				newEvent.dataTransfer = dataTransfer;
			}
			
			if (targetNode) {
				targetNode.dispatchEvent(newEvent);
				//targetNode.focus();
			}
		} catch(e) {
			alert(e);
		}
	},
	dataList : {},
	getDataTransfer : function(id) {
		id += "";
		if (!this.dataList[id]) {
			this.dataList[id] = new CustomDataTransfer();
		}
		return this.dataList[id];
	},
	hasDataTransfer : function(id) {
		id += "";
		return !!this.dataList[id];
	},
	clearDataTransfer : function(id) {
		id += "";
		delete this.dataList[id];
	},
	_log : function(message) {
		//alert(message);
		window.console.log(message);
	},
};


function CustomDataTransfer() {
	this.data = null;
}
CustomDataTransfer.prototype.setData = function(type, data) {
	this.data = data;
};
CustomDataTransfer.prototype.getData = function(type) {
	return this.data;
};
// © 2012 Daniel Schulz
//"(╯^_^)╯"	"╯)^_^╯)"
var tableFlip = " ︵╯(^‾^╯)";
var UnicodeMapper = {
	exceptionCodes : {
		normal : {
			"ß" : 0x1E9E,
		},
		italic : {
			h : 0x210E,
			"'" : "′",
			"\"" : "″",
		},
		bold : {
			0 : 0x1D7CE,
			1 : 0x1D7CF,
			2 : 0x1D7D0,
			3 : 0x1D7D1,
			4 : 0x1D7D2,
			5 : 0x1D7D3,
			6 : 0x1D7D4,
			7 : 0x1D7D5,
			8 : 0x1D7D6,
			9 : 0x1D7D7,
		},
		handwriting : {
			g : 0x210A,
			l : 0x2113,
			e : 0x212F,
			o : 0x2134,
			B : 0x212C,
			E : 0x2130,
			F : 0x2131,
			H : 0x210B,
			I : 0x2110,
			L : 0x2112,
			R : 0x211B,
			M : 0x2133,
		},
		fraktur : {
			H : 0x210C,
			I : 0x2111,
			R : 0x211C,
			Z : 0x2128,
			C : 0x212D,
		},
		doublestruck : {
			C : 0x2102,
			H : 0x210D,
			N : 0x2115,
			P : 0x2119,
			Q : 0x211A,
			R : 0x211D,
			Z : 0x2124,
			0 : 0x1D7D8,
			1 : 0x1D7D9,
			2 : 0x1D7DA,
			3 : 0x1D7DB,
			4 : 0x1D7DC,
			5 : 0x1D7DD,
			6 : 0x1D7DE,
			7 : 0x1D7DF,
			8 : 0x1D7E0,
			9 : 0x1D7E1,
		},
		"sans-serif" : {
			0 : 0x1D7E2,
			1 : 0x1D7E3,
			2 : 0x1D7E4,
			3 : 0x1D7E5,
			4 : 0x1D7E6,
			5 : 0x1D7E7,
			6 : 0x1D7E8,
			7 : 0x1D7E9,
			8 : 0x1D7EA,
			9 : 0x1D7EB,
		},
		"sans-serif+bold" : {
			0 : 0x1D7EC,
			1 : 0x1D7ED,
			2 : 0x1D7EE,
			3 : 0x1D7EF,
			4 : 0x1D7F0,
			5 : 0x1D7F1,
			6 : 0x1D7F2,
			7 : 0x1D7F3,
			8 : 0x1D7F4,
			9 : 0x1D7F5,
		},
		monospace : {
			0 : 0x1D7F6,
			1 : 0x1D7F7,
			2 : 0x1D7F8,
			3 : 0x1D7F9,
			4 : 0x1D7FA,
			5 : 0x1D7FB,
			6 : 0x1D7FC,
			7 : 0x1D7FD,
			8 : 0x1D7FE,
			9 : 0x1D7FF,
		},
		Capitals : {
			a : 0x1D00,
			b : 0x0299,
			c : 0x1D04,
			d : 0x1D05,
			e : 0x1D07,
			f : 0xA730,
			g : 0x0262,
			h : 0x029C,
			i : 0x026A,
			j : 0x1D0A,
			k : 0x1D0B,
			l : 0x029F,
			m : 0x1D0D,
			n : 0x0274,
			o : 0x1D0F,
			p : 0x1D18,
			q : 0xA7EE,
			r : 0x0280,
			s : 0xA731,
			t : 0x1D1B,
			u : 0x1D1C,
			v : 0x1D20,
			w : 0x1D21,
			x : 0xA7EF,
			y : 0x028F,
			z : 0x1D22,
		},
		fullwidth : {
			" " : "　",
			"." : "。",
			"!" : "！",
			"?" : "？",
			"," : "、",
			"(" : "（",
			")" : "）",
			"~" : "〜",
		},
	},
	startCodes : {
		normal : [
			0x0061,
			0x0041,
		],
		bold 		: [
			0x1D41A,
			0x1D400,
		],
		italic 		: [
			0x1D44E,
			0x1D434,
		],
		"bold+italic" : [
			0x1D482,
			0x1D468,
		],
		"sans-serif" : [
			0x1D5BA,
			0x1D5A0,
		],
		"sans-serif+bold" : [
			0x1D5EE,
			0x1D5D4,
		],
		"sans-serif+italic" : [
			0x1D622,
			0x1D608,
		],
		"sans-serif+bold+italic" : [
			0x1D656,
			0x1D63C,
		],
		handwriting : [
			0x1D4B6,
			0x1D49C,
		],
		"bold+handwriting" : [
			0x1D4EA,
			0x1D4D0,
		],
		fraktur : [
			0x1D51E,
			0x1D504,
		],
		"bold+fraktur" : [
			0x1D586,
			0x1D56C,
		],
		fullwidth : [
			0xFF41,
			0xFF21,
		],
		monospace : [
			0x1D68A,
			0x1D670,
		],
		doublestruck : [
			0x1D552,
			0x1D538,
		],
		Capitals : [
			0x1D00,
		],
		underlined : [
		],
	},
	outputNodes : undefined,
	init : function() {
		var parentNode, legendNode, childNode, fontType, i, key, val;
		if (!this.initialized) {
			var flipTable = {
				0x0021 : 0x00A1,
				0x0022 : 0x201E,
				0x0026 : 0x214B,
				0x0027 : 0x002C,
				0x0028 : 0x0029,
				0x002E : 0x02D9,
				0x0033 : 0x0190,
				0x0034 : 0x152D,
				0x0036 : 0x0039,
				0x0037 : 0x2C62,
				0x003B : 0x061B,
				0x003C : 0x003E,
				0x003F : 0x00BF,
				0x0041 : 0x2200,
				0x0042 : 0x10412,
				0x0043 : 0x2183,
				0x0044 : 0x25D6,
				0x0045 : 0x018E,
				0x0046 : 0x2132,
				0x0047 : 0x2141,
				0x004A : 0x017F,
				0x004B : 0x22CA,
				0x004C : 0x2142,
				0x004D : 0x0057,
				0x004E : 0x1D0E,
				0x0050 : 0x0500,
				0x0051 : 0x038C,
				0x0052 : 0x1D1A,
				0x0054 : 0x22A5,
				0x0055 : 0x2229,
				0x0056 : 0x1D27,
				0x0059 : 0x2144,
				0x005B : 0x005D,
				0x005F : 0x203E,
				0x0061 : 0x0250,
				0x0062 : 0x0071,
				0x0063 : 0x0254,
				0x0064 : 0x0070,
				0x0065 : 0x01DD,
				0x0066 : 0x025F,
				0x0067 : 0x0183,
				0x0068 : 0x0265,
				0x0069 : 0x0131,
				0x006A : 0x027E,
				0x006B : 0x029E,
				0x006C : 0x0283,
				0x006D : 0x026F,
				0x006E : 0x0075,
				0x0072 : 0x0279,
				0x0074 : 0x0287,
				0x0076 : 0x028C,
				0x0077 : 0x028D,
				0x0079 : 0x028E,
				0x007B : 0x007D,
				0x203F : 0x2040,
				0x2045 : 0x2046,
				0x2234 : 0x2235,
			};
			this.exceptionCodes[tableFlip] = {};
			this.startCodes[tableFlip] = [];
			for (i in flipTable) {
				key = this.fromCodePoint(i);
				val = this.fromCodePoint(flipTable[i]);
				this.exceptionCodes[tableFlip][key] = val;
				this.exceptionCodes[tableFlip][val] = key;
			}
			this.outputNodes = {};
			parentNode = document.getElementsByTagName("fieldset")[0];
			for (fontType in this.startCodes) {
				labelNode = document.createElementNS(NS.HTML, "label");
				childNode = document.createElementNS(NS.HTML, "span");
				childNode.appendChild(document.createTextNode(this.convertWord(fontType, fontType)));
				labelNode.appendChild(childNode);
				this.outputNodes[fontType] = document.createElementNS(NS.HTML, "textarea");
				this.outputNodes[fontType].setAttribute("class", "myParagraph");
				this.outputNodes[fontType].setAttribute("cols", "100");
				this.outputNodes[fontType].setAttribute("rows", "0");
				labelNode.appendChild(this.outputNodes[fontType]);
				parentNode.appendChild(labelNode);
                                parentNode.appendChild(document.createElement("br"));

			}
			
			this.initialized = true;
		}
	},
	typeCharacter : function(inputNode) {
		var text, currentChar, i, fontType, outputNode, outputText, isUpperCase, codePoint;
		this.init();
		inputText = inputNode.value;
		outputText = {};
		
		//initialize output
		for (fontType in this.startCodes) {
			outputText[fontType] = "";
		}
		
		//generate output
		for (fontType in this.startCodes) {
			outputText[fontType] = this.convertWord(inputText, fontType);
		}
		
		//set output
		for (fontType in this.startCodes) {
			if (outputNode = this.outputNodes[fontType]) {
				outputNode.value = outputText[fontType];
			}
		}
	},
	convertWord : function(inputText, fontType) {
		var outputText, currentChar, codePoint, isUpperCase, i;
		outputText = "";
		for (i = 0; i < inputText.length; i++) {
			currentChar = inputText[i];
			if (this.exceptionCodes[fontType] && this.exceptionCodes[fontType][currentChar]) {
				if (typeof(this.exceptionCodes[fontType][currentChar]) === "number") {
					codePoint = this.exceptionCodes[fontType][currentChar];
					currentChar = this.fromCodePoint(codePoint);
				} else {
					currentChar = this.exceptionCodes[fontType][currentChar];
				}
			} else {
				switch (fontType) {
					case "underlined":
						currentChar += "̲";
						break;
					default:
						//letter found!
						if (currentChar.toUpperCase() !== currentChar.toLowerCase()) {
							isUpperCase = currentChar === currentChar.toUpperCase()
								? 1
								: 0;
							if (this.startCodes[fontType][isUpperCase]) {
								codePoint = this.toCodePoint(currentChar);
								codePoint -= this.startCodes.normal[isUpperCase];
								codePoint += this.startCodes[fontType][isUpperCase];
								currentChar = this.fromCodePoint(codePoint);
							}
						}
				}
			}
			outputText += currentChar;
		}
		if (fontType === tableFlip) {
			outputText = this.flipString(outputText);
		}
		return outputText;
	},
	//https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/String/fromCharCode
	fromCodePoint : function() {
        var chars = [], point, offset, units, i;
        for (i = 0; i < arguments.length; ++i) {
            point = arguments[i];
            offset = point - 0x10000;
            units = point > 0xFFFF ? [0xD800 + (offset >> 10), 0xDC00 + (offset & 0x3FF)] : [point];
            chars.push(String.fromCharCode.apply(null, units));
        }
        return chars.join("");
    },
	toCodePoint : function(str) {
		return str.charCodeAt(0);
	},
	flipString : function(str) {
		var ret, i;
		ret = "";
		for (i = str.length - 1; i >= 0; i--) {
			ret += str[i];
		}
		return ret;
	},
};

addEventListener(
	"load",
	function(eve) {
		UnicodeMapper.init();
	},
	false
);
