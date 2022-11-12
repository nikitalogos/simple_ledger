/**
 * This file was generated from parser.peg
 * See https://canopy.jcoglan.com/ for documentation
 */

(function () {
  'use strict';

  function TreeNode (text, offset, elements) {
    this.text = text;
    this.offset = offset;
    this.elements = elements;
  }

  TreeNode.prototype.forEach = function (block, context) {
    for (var el = this.elements, i = 0, n = el.length; i < n; i++) {
      block.call(context, el[i], i, el);
    }
  };

  if (typeof Symbol !== 'undefined' && Symbol.iterator) {
    TreeNode.prototype[Symbol.iterator] = function () {
      return this.elements[Symbol.iterator]();
    };
  }

  var TreeNode1 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['statement'] = elements[0];
  };
  inherit(TreeNode1, TreeNode);

  var TreeNode2 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['statement'] = elements[1];
  };
  inherit(TreeNode2, TreeNode);

  var TreeNode3 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['action'] = elements[0];
  };
  inherit(TreeNode3, TreeNode);

  var TreeNode4 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['key'] = elements[0];
    this['value'] = elements[2];
  };
  inherit(TreeNode4, TreeNode);

  var TreeNode5 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['tag_name'] = elements[1];
  };
  inherit(TreeNode5, TreeNode);

  var TreeNode6 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['var_name'] = elements[1];
  };
  inherit(TreeNode6, TreeNode);

  var TreeNode7 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['var_name'] = elements[1];
  };
  inherit(TreeNode7, TreeNode);

  var TreeNode8 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['title'] = elements[4];
  };
  inherit(TreeNode8, TreeNode);

  var TreeNode9 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['label'] = elements[0];
  };
  inherit(TreeNode9, TreeNode);

  var TreeNode10 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['time_expr'] = elements[0];
  };
  inherit(TreeNode10, TreeNode);

  var TreeNode11 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['reminder'] = elements[0];
  };
  inherit(TreeNode11, TreeNode);

  var TreeNode12 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['state'] = elements[0];
  };
  inherit(TreeNode12, TreeNode);

  var TreeNode13 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['var_name'] = elements[0];
  };
  inherit(TreeNode13, TreeNode);

  var TreeNode14 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['time_point'] = elements[0];
  };
  inherit(TreeNode14, TreeNode);

  var TreeNode15 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['time_point'] = elements[1];
  };
  inherit(TreeNode15, TreeNode);

  var TreeNode16 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['state_value'] = elements[0];
  };
  inherit(TreeNode16, TreeNode);

  var TreeNode17 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['title_segment'] = elements[0];
  };
  inherit(TreeNode17, TreeNode);

  var TreeNode18 = function (text, offset, elements) {
    TreeNode.apply(this, arguments);
    this['title_segment'] = elements[1];
  };
  inherit(TreeNode18, TreeNode);

  var FAILURE = {};

  var Grammar = {
    _read_statements () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._statements = this._cache._statements || {};
      var cached = this._cache._statements[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_statement();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset, elements1 = [], address3 = null;
        while (true) {
          var index3 = this._offset, elements2 = new Array(2);
          var address4 = FAILURE;
          var chunk0 = null, max0 = this._offset + 1;
          if (max0 <= this._inputSize) {
            chunk0 = this._input.substring(this._offset, max0);
          }
          if (chunk0 === '\n') {
            address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address4 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['text_parser::statements', '"\\n"']);
            }
          }
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address5 = FAILURE;
            address5 = this._read_statement();
            if (address5 !== FAILURE) {
              elements2[1] = address5;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode2(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
          } else {
            break;
          }
        }
        if (elements1.length >= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.make_statements(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._statements[index0] = [address0, this._offset];
      return address0;
    },

    _read_statement () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._statement = this._cache._statement || {};
      var cached = this._cache._statement[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(1);
      var address1 = FAILURE;
      var index2 = this._offset, elements1 = [], address2 = null;
      while (true) {
        address2 = this._read_space();
        if (address2 !== FAILURE) {
          elements1.push(address2);
        } else {
          break;
        }
      }
      if (elements1.length >= 0) {
        address1 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
        this._offset = this._offset;
      } else {
        address1 = FAILURE;
      }
      if (address1 !== FAILURE) {
        var address3 = FAILURE;
        address3 = this._read_action();
        if (address3 !== FAILURE) {
          elements0[0] = address3;
          var address4 = FAILURE;
          var index3 = this._offset, elements2 = [], address5 = null;
          while (true) {
            address5 = this._read_space();
            if (address5 !== FAILURE) {
              elements2.push(address5);
            } else {
              break;
            }
          }
          if (elements2.length >= 0) {
            address4 = new TreeNode(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          } else {
            address4 = FAILURE;
          }
          if (address4 !== FAILURE) {
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.make_statement(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._statement[index0] = [address0, this._offset];
      return address0;
    },

    _read_meta () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._meta = this._cache._meta || {};
      var cached = this._cache._meta[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_key_value();
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_tag();
        if (address0 === FAILURE) {
          this._offset = index1;
          address0 = this._read_compact_form();
          if (address0 === FAILURE) {
            this._offset = index1;
          }
        }
      }
      if (address0 !== FAILURE) {
        Object.assign(address0, this._types.Meta);
      }
      this._cache._meta[index0] = [address0, this._offset];
      return address0;
    },

    _read_key_value () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._key_value = this._cache._key_value || {};
      var cached = this._cache._key_value[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(3);
      var address1 = FAILURE;
      address1 = this._read_key();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var chunk0 = null, max0 = this._offset + 1;
        if (max0 <= this._inputSize) {
          chunk0 = this._input.substring(this._offset, max0);
        }
        if (chunk0 === ':') {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push(['text_parser::key_value', '":"']);
          }
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
          var address3 = FAILURE;
          address3 = this._read_value();
          if (address3 !== FAILURE) {
            elements0[2] = address3;
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode4(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._key_value[index0] = [address0, this._offset];
      return address0;
    },

    _read_key () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._key = this._cache._key || {};
      var cached = this._cache._key[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      var chunk0 = null, max0 = this._offset + 5;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === 'layer') {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 5), this._offset, []);
        this._offset = this._offset + 5;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['text_parser::key', '"layer"']);
        }
      }
      if (address0 === FAILURE) {
        this._offset = index1;
        var chunk1 = null, max1 = this._offset + 8;
        if (max1 <= this._inputSize) {
          chunk1 = this._input.substring(this._offset, max1);
        }
        if (chunk1 === 'location') {
          address0 = new TreeNode(this._input.substring(this._offset, this._offset + 8), this._offset, []);
          this._offset = this._offset + 8;
        } else {
          address0 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push(['text_parser::key', '"location"']);
          }
        }
        if (address0 === FAILURE) {
          this._offset = index1;
          var chunk2 = null, max2 = this._offset + 6;
          if (max2 <= this._inputSize) {
            chunk2 = this._input.substring(this._offset, max2);
          }
          if (chunk2 === 'kanban') {
            address0 = new TreeNode(this._input.substring(this._offset, this._offset + 6), this._offset, []);
            this._offset = this._offset + 6;
          } else {
            address0 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['text_parser::key', '"kanban"']);
            }
          }
          if (address0 === FAILURE) {
            this._offset = index1;
            var chunk3 = null, max3 = this._offset + 4;
            if (max3 <= this._inputSize) {
              chunk3 = this._input.substring(this._offset, max3);
            }
            if (chunk3 === 'date') {
              address0 = new TreeNode(this._input.substring(this._offset, this._offset + 4), this._offset, []);
              this._offset = this._offset + 4;
            } else {
              address0 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push(['text_parser::key', '"date"']);
              }
            }
            if (address0 === FAILURE) {
              this._offset = index1;
              var chunk4 = null, max4 = this._offset + 2;
              if (max4 <= this._inputSize) {
                chunk4 = this._input.substring(this._offset, max4);
              }
              if (chunk4 === 'bg') {
                address0 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset, []);
                this._offset = this._offset + 2;
              } else {
                address0 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push(['text_parser::key', '"bg"']);
                }
              }
              if (address0 === FAILURE) {
                this._offset = index1;
                var chunk5 = null, max5 = this._offset + 6;
                if (max5 <= this._inputSize) {
                  chunk5 = this._input.substring(this._offset, max5);
                }
                if (chunk5 === 'repeat') {
                  address0 = new TreeNode(this._input.substring(this._offset, this._offset + 6), this._offset, []);
                  this._offset = this._offset + 6;
                } else {
                  address0 = FAILURE;
                  if (this._offset > this._failure) {
                    this._failure = this._offset;
                    this._expected = [];
                  }
                  if (this._offset === this._failure) {
                    this._expected.push(['text_parser::key', '"repeat"']);
                  }
                }
                if (address0 === FAILURE) {
                  this._offset = index1;
                  var chunk6 = null, max6 = this._offset + 4;
                  if (max6 <= this._inputSize) {
                    chunk6 = this._input.substring(this._offset, max6);
                  }
                  if (chunk6 === 'name') {
                    address0 = new TreeNode(this._input.substring(this._offset, this._offset + 4), this._offset, []);
                    this._offset = this._offset + 4;
                  } else {
                    address0 = FAILURE;
                    if (this._offset > this._failure) {
                      this._failure = this._offset;
                      this._expected = [];
                    }
                    if (this._offset === this._failure) {
                      this._expected.push(['text_parser::key', '"name"']);
                    }
                  }
                  if (address0 === FAILURE) {
                    this._offset = index1;
                    var chunk7 = null, max7 = this._offset + 5;
                    if (max7 <= this._inputSize) {
                      chunk7 = this._input.substring(this._offset, max7);
                    }
                    if (chunk7 === 'color') {
                      address0 = new TreeNode(this._input.substring(this._offset, this._offset + 5), this._offset, []);
                      this._offset = this._offset + 5;
                    } else {
                      address0 = FAILURE;
                      if (this._offset > this._failure) {
                        this._failure = this._offset;
                        this._expected = [];
                      }
                      if (this._offset === this._failure) {
                        this._expected.push(['text_parser::key', '"color"']);
                      }
                    }
                    if (address0 === FAILURE) {
                      this._offset = index1;
                      var chunk8 = null, max8 = this._offset + 5;
                      if (max8 <= this._inputSize) {
                        chunk8 = this._input.substring(this._offset, max8);
                      }
                      if (chunk8 === 'style') {
                        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 5), this._offset, []);
                        this._offset = this._offset + 5;
                      } else {
                        address0 = FAILURE;
                        if (this._offset > this._failure) {
                          this._failure = this._offset;
                          this._expected = [];
                        }
                        if (this._offset === this._failure) {
                          this._expected.push(['text_parser::key', '"style"']);
                        }
                      }
                      if (address0 === FAILURE) {
                        this._offset = index1;
                        var chunk9 = null, max9 = this._offset + 6;
                        if (max9 <= this._inputSize) {
                          chunk9 = this._input.substring(this._offset, max9);
                        }
                        if (chunk9 === 'prefix') {
                          address0 = new TreeNode(this._input.substring(this._offset, this._offset + 6), this._offset, []);
                          this._offset = this._offset + 6;
                        } else {
                          address0 = FAILURE;
                          if (this._offset > this._failure) {
                            this._failure = this._offset;
                            this._expected = [];
                          }
                          if (this._offset === this._failure) {
                            this._expected.push(['text_parser::key', '"prefix"']);
                          }
                        }
                        if (address0 === FAILURE) {
                          this._offset = index1;
                          var chunk10 = null, max10 = this._offset + 3;
                          if (max10 <= this._inputSize) {
                            chunk10 = this._input.substring(this._offset, max10);
                          }
                          if (chunk10 === 'pin') {
                            address0 = new TreeNode(this._input.substring(this._offset, this._offset + 3), this._offset, []);
                            this._offset = this._offset + 3;
                          } else {
                            address0 = FAILURE;
                            if (this._offset > this._failure) {
                              this._failure = this._offset;
                              this._expected = [];
                            }
                            if (this._offset === this._failure) {
                              this._expected.push(['text_parser::key', '"pin"']);
                            }
                          }
                          if (address0 === FAILURE) {
                            this._offset = index1;
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      this._cache._key[index0] = [address0, this._offset];
      return address0;
    },

    _read_value () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._value = this._cache._value || {};
      var cached = this._cache._value[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      var index2 = this._offset, elements0 = new Array(1);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 1;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 !== null && /^["]/.test(chunk0)) {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['text_parser::value', '["]']);
        }
      }
      if (address1 !== FAILURE) {
        var address2 = FAILURE;
        var index3 = this._offset, elements1 = [], address3 = null;
        while (true) {
          var index4 = this._offset, elements2 = new Array(2);
          var address4 = FAILURE;
          var index5 = this._offset;
          var chunk1 = null, max1 = this._offset + 1;
          if (max1 <= this._inputSize) {
            chunk1 = this._input.substring(this._offset, max1);
          }
          if (chunk1 !== null && /^["\n]/.test(chunk1)) {
            address4 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address4 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['text_parser::value', '["\\n]']);
            }
          }
          this._offset = index5;
          if (address4 === FAILURE) {
            address4 = new TreeNode(this._input.substring(this._offset, this._offset), this._offset, []);
            this._offset = this._offset;
          } else {
            address4 = FAILURE;
          }
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address5 = FAILURE;
            if (this._offset < this._inputSize) {
              address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
              this._offset = this._offset + 1;
            } else {
              address5 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push(['text_parser::value', '<any char>']);
              }
            }
            if (address5 !== FAILURE) {
              elements2[1] = address5;
            } else {
              elements2 = null;
              this._offset = index4;
            }
          } else {
            elements2 = null;
            this._offset = index4;
          }
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode(this._input.substring(index4, this._offset), index4, elements2);
            this._offset = this._offset;
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
          } else {
            break;
          }
        }
        if (elements1.length >= 0) {
          address2 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[0] = address2;
          var address6 = FAILURE;
          var index6 = this._offset;
          var chunk2 = null, max2 = this._offset + 1;
          if (max2 <= this._inputSize) {
            chunk2 = this._input.substring(this._offset, max2);
          }
          if (chunk2 !== null && /^["]/.test(chunk2)) {
            address6 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address6 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['text_parser::value', '["]']);
            }
          }
          if (address6 === FAILURE) {
            address6 = new TreeNode(this._input.substring(index6, index6), index6, []);
            this._offset = index6;
          }
          if (address6 !== FAILURE) {
          } else {
            elements0 = null;
            this._offset = index2;
          }
        } else {
          elements0 = null;
          this._offset = index2;
        }
      } else {
        elements0 = null;
        this._offset = index2;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode(this._input.substring(index2, this._offset), index2, elements0);
        this._offset = this._offset;
      }
      if (address0 === FAILURE) {
        this._offset = index1;
        var index7 = this._offset, elements3 = new Array(1);
        var address7 = FAILURE;
        var chunk3 = null, max3 = this._offset + 1;
        if (max3 <= this._inputSize) {
          chunk3 = this._input.substring(this._offset, max3);
        }
        if (chunk3 !== null && /^[']/.test(chunk3)) {
          address7 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address7 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push(['text_parser::value', '[\']']);
          }
        }
        if (address7 !== FAILURE) {
          var address8 = FAILURE;
          var index8 = this._offset, elements4 = [], address9 = null;
          while (true) {
            var index9 = this._offset, elements5 = new Array(2);
            var address10 = FAILURE;
            var index10 = this._offset;
            var chunk4 = null, max4 = this._offset + 1;
            if (max4 <= this._inputSize) {
              chunk4 = this._input.substring(this._offset, max4);
            }
            if (chunk4 !== null && /^['\n]/.test(chunk4)) {
              address10 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
              this._offset = this._offset + 1;
            } else {
              address10 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push(['text_parser::value', '[\'\\n]']);
              }
            }
            this._offset = index10;
            if (address10 === FAILURE) {
              address10 = new TreeNode(this._input.substring(this._offset, this._offset), this._offset, []);
              this._offset = this._offset;
            } else {
              address10 = FAILURE;
            }
            if (address10 !== FAILURE) {
              elements5[0] = address10;
              var address11 = FAILURE;
              if (this._offset < this._inputSize) {
                address11 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
                this._offset = this._offset + 1;
              } else {
                address11 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push(['text_parser::value', '<any char>']);
                }
              }
              if (address11 !== FAILURE) {
                elements5[1] = address11;
              } else {
                elements5 = null;
                this._offset = index9;
              }
            } else {
              elements5 = null;
              this._offset = index9;
            }
            if (elements5 === null) {
              address9 = FAILURE;
            } else {
              address9 = new TreeNode(this._input.substring(index9, this._offset), index9, elements5);
              this._offset = this._offset;
            }
            if (address9 !== FAILURE) {
              elements4.push(address9);
            } else {
              break;
            }
          }
          if (elements4.length >= 0) {
            address8 = new TreeNode(this._input.substring(index8, this._offset), index8, elements4);
            this._offset = this._offset;
          } else {
            address8 = FAILURE;
          }
          if (address8 !== FAILURE) {
            elements3[0] = address8;
            var address12 = FAILURE;
            var index11 = this._offset;
            var chunk5 = null, max5 = this._offset + 1;
            if (max5 <= this._inputSize) {
              chunk5 = this._input.substring(this._offset, max5);
            }
            if (chunk5 !== null && /^[']/.test(chunk5)) {
              address12 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
              this._offset = this._offset + 1;
            } else {
              address12 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push(['text_parser::value', '[\']']);
              }
            }
            if (address12 === FAILURE) {
              address12 = new TreeNode(this._input.substring(index11, index11), index11, []);
              this._offset = index11;
            }
            if (address12 !== FAILURE) {
            } else {
              elements3 = null;
              this._offset = index7;
            }
          } else {
            elements3 = null;
            this._offset = index7;
          }
        } else {
          elements3 = null;
          this._offset = index7;
        }
        if (elements3 === null) {
          address0 = FAILURE;
        } else {
          address0 = new TreeNode(this._input.substring(index7, this._offset), index7, elements3);
          this._offset = this._offset;
        }
        if (address0 === FAILURE) {
          this._offset = index1;
          var index12 = this._offset, elements6 = [], address13 = null;
          while (true) {
            var index13 = this._offset, elements7 = new Array(2);
            var address14 = FAILURE;
            var index14 = this._offset;
            var chunk6 = null, max6 = this._offset + 1;
            if (max6 <= this._inputSize) {
              chunk6 = this._input.substring(this._offset, max6);
            }
            if (chunk6 !== null && /^[ \n\t'"]/.test(chunk6)) {
              address14 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
              this._offset = this._offset + 1;
            } else {
              address14 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push(['text_parser::value', '[ \\n\\t\'"]']);
              }
            }
            this._offset = index14;
            if (address14 === FAILURE) {
              address14 = new TreeNode(this._input.substring(this._offset, this._offset), this._offset, []);
              this._offset = this._offset;
            } else {
              address14 = FAILURE;
            }
            if (address14 !== FAILURE) {
              elements7[0] = address14;
              var address15 = FAILURE;
              if (this._offset < this._inputSize) {
                address15 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
                this._offset = this._offset + 1;
              } else {
                address15 = FAILURE;
                if (this._offset > this._failure) {
                  this._failure = this._offset;
                  this._expected = [];
                }
                if (this._offset === this._failure) {
                  this._expected.push(['text_parser::value', '<any char>']);
                }
              }
              if (address15 !== FAILURE) {
                elements7[1] = address15;
              } else {
                elements7 = null;
                this._offset = index13;
              }
            } else {
              elements7 = null;
              this._offset = index13;
            }
            if (elements7 === null) {
              address13 = FAILURE;
            } else {
              address13 = new TreeNode(this._input.substring(index13, this._offset), index13, elements7);
              this._offset = this._offset;
            }
            if (address13 !== FAILURE) {
              elements6.push(address13);
            } else {
              break;
            }
          }
          if (elements6.length >= 0) {
            address0 = new TreeNode(this._input.substring(index12, this._offset), index12, elements6);
            this._offset = this._offset;
          } else {
            address0 = FAILURE;
          }
          if (address0 === FAILURE) {
            this._offset = index1;
          }
        }
      }
      this._cache._value[index0] = [address0, this._offset];
      return address0;
    },

    _read_tag_name () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._tag_name = this._cache._tag_name || {};
      var cached = this._cache._tag_name[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      var chunk0 = null, max0 = this._offset + 4;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === 'busy') {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 4), this._offset, []);
        this._offset = this._offset + 4;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['text_parser::tag_name', '"busy"']);
        }
      }
      if (address0 === FAILURE) {
        this._offset = index1;
        var chunk1 = null, max1 = this._offset + 2;
        if (max1 <= this._inputSize) {
          chunk1 = this._input.substring(this._offset, max1);
        }
        if (chunk1 === 'bg') {
          address0 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset, []);
          this._offset = this._offset + 2;
        } else {
          address0 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push(['text_parser::tag_name', '"bg"']);
          }
        }
        if (address0 === FAILURE) {
          this._offset = index1;
          address0 = this._read_var_name();
          if (address0 === FAILURE) {
            this._offset = index1;
          }
        }
      }
      this._cache._tag_name[index0] = [address0, this._offset];
      return address0;
    },

    _read_tag () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._tag = this._cache._tag || {};
      var cached = this._cache._tag[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 1;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === '#') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['text_parser::tag', '"#"']);
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_tag_name();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode5(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._tag[index0] = [address0, this._offset];
      return address0;
    },

    _read_compact_form () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._compact_form = this._cache._compact_form || {};
      var cached = this._cache._compact_form[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_compact_location();
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_compact_action_name();
        if (address0 === FAILURE) {
          this._offset = index1;
        }
      }
      this._cache._compact_form[index0] = [address0, this._offset];
      return address0;
    },

    _read_compact_location () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._compact_location = this._cache._compact_location || {};
      var cached = this._cache._compact_location[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 1;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === '@') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['text_parser::compact_location', '"@"']);
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_var_name();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode6(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      if (address0 !== FAILURE) {
        Object.assign(address0, this._types.CompactLocation);
      }
      this._cache._compact_location[index0] = [address0, this._offset];
      return address0;
    },

    _read_compact_action_name () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._compact_action_name = this._cache._compact_action_name || {};
      var cached = this._cache._compact_action_name[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 1;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === '$') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['text_parser::compact_action_name', '"$"']);
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        address2 = this._read_var_name();
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode7(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      if (address0 !== FAILURE) {
        Object.assign(address0, this._types.CompactActionName);
      }
      this._cache._compact_action_name[index0] = [address0, this._offset];
      return address0;
    },

    _read_action () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._action = this._cache._action || {};
      var cached = this._cache._action[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(5);
      var address1 = FAILURE;
      var index2 = this._offset;
      var index3 = this._offset, elements1 = new Array(2);
      var address2 = FAILURE;
      address2 = this._read_label();
      if (address2 !== FAILURE) {
        elements1[0] = address2;
        var address3 = FAILURE;
        var index4 = this._offset, elements2 = [], address4 = null;
        while (true) {
          address4 = this._read_space();
          if (address4 !== FAILURE) {
            elements2.push(address4);
          } else {
            break;
          }
        }
        if (elements2.length >= 1) {
          address3 = new TreeNode(this._input.substring(index4, this._offset), index4, elements2);
          this._offset = this._offset;
        } else {
          address3 = FAILURE;
        }
        if (address3 !== FAILURE) {
          elements1[1] = address3;
        } else {
          elements1 = null;
          this._offset = index3;
        }
      } else {
        elements1 = null;
        this._offset = index3;
      }
      if (elements1 === null) {
        address1 = FAILURE;
      } else {
        address1 = new TreeNode9(this._input.substring(index3, this._offset), index3, elements1);
        this._offset = this._offset;
      }
      if (address1 === FAILURE) {
        address1 = new TreeNode(this._input.substring(index2, index2), index2, []);
        this._offset = index2;
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address5 = FAILURE;
        var index5 = this._offset;
        var index6 = this._offset, elements3 = new Array(2);
        var address6 = FAILURE;
        address6 = this._read_time_expr();
        if (address6 !== FAILURE) {
          elements3[0] = address6;
          var address7 = FAILURE;
          var index7 = this._offset, elements4 = [], address8 = null;
          while (true) {
            address8 = this._read_space();
            if (address8 !== FAILURE) {
              elements4.push(address8);
            } else {
              break;
            }
          }
          if (elements4.length >= 1) {
            address7 = new TreeNode(this._input.substring(index7, this._offset), index7, elements4);
            this._offset = this._offset;
          } else {
            address7 = FAILURE;
          }
          if (address7 !== FAILURE) {
            elements3[1] = address7;
          } else {
            elements3 = null;
            this._offset = index6;
          }
        } else {
          elements3 = null;
          this._offset = index6;
        }
        if (elements3 === null) {
          address5 = FAILURE;
        } else {
          address5 = new TreeNode10(this._input.substring(index6, this._offset), index6, elements3);
          this._offset = this._offset;
        }
        if (address5 === FAILURE) {
          address5 = new TreeNode(this._input.substring(index5, index5), index5, []);
          this._offset = index5;
        }
        if (address5 !== FAILURE) {
          elements0[1] = address5;
          var address9 = FAILURE;
          var index8 = this._offset, elements5 = [], address10 = null;
          while (true) {
            var index9 = this._offset, elements6 = new Array(2);
            var address11 = FAILURE;
            address11 = this._read_reminder();
            if (address11 !== FAILURE) {
              elements6[0] = address11;
              var address12 = FAILURE;
              var index10 = this._offset, elements7 = [], address13 = null;
              while (true) {
                address13 = this._read_space();
                if (address13 !== FAILURE) {
                  elements7.push(address13);
                } else {
                  break;
                }
              }
              if (elements7.length >= 1) {
                address12 = new TreeNode(this._input.substring(index10, this._offset), index10, elements7);
                this._offset = this._offset;
              } else {
                address12 = FAILURE;
              }
              if (address12 !== FAILURE) {
                elements6[1] = address12;
              } else {
                elements6 = null;
                this._offset = index9;
              }
            } else {
              elements6 = null;
              this._offset = index9;
            }
            if (elements6 === null) {
              address10 = FAILURE;
            } else {
              address10 = new TreeNode11(this._input.substring(index9, this._offset), index9, elements6);
              this._offset = this._offset;
            }
            if (address10 !== FAILURE) {
              elements5.push(address10);
            } else {
              break;
            }
          }
          if (elements5.length >= 0) {
            address9 = new TreeNode(this._input.substring(index8, this._offset), index8, elements5);
            this._offset = this._offset;
          } else {
            address9 = FAILURE;
          }
          if (address9 !== FAILURE) {
            elements0[2] = address9;
            var address14 = FAILURE;
            var index11 = this._offset;
            var index12 = this._offset, elements8 = new Array(2);
            var address15 = FAILURE;
            address15 = this._read_state();
            if (address15 !== FAILURE) {
              elements8[0] = address15;
              var address16 = FAILURE;
              var index13 = this._offset, elements9 = [], address17 = null;
              while (true) {
                address17 = this._read_space();
                if (address17 !== FAILURE) {
                  elements9.push(address17);
                } else {
                  break;
                }
              }
              if (elements9.length >= 1) {
                address16 = new TreeNode(this._input.substring(index13, this._offset), index13, elements9);
                this._offset = this._offset;
              } else {
                address16 = FAILURE;
              }
              if (address16 !== FAILURE) {
                elements8[1] = address16;
              } else {
                elements8 = null;
                this._offset = index12;
              }
            } else {
              elements8 = null;
              this._offset = index12;
            }
            if (elements8 === null) {
              address14 = FAILURE;
            } else {
              address14 = new TreeNode12(this._input.substring(index12, this._offset), index12, elements8);
              this._offset = this._offset;
            }
            if (address14 === FAILURE) {
              address14 = new TreeNode(this._input.substring(index11, index11), index11, []);
              this._offset = index11;
            }
            if (address14 !== FAILURE) {
              elements0[3] = address14;
              var address18 = FAILURE;
              address18 = this._read_title();
              if (address18 !== FAILURE) {
                elements0[4] = address18;
              } else {
                elements0 = null;
                this._offset = index1;
              }
            } else {
              elements0 = null;
              this._offset = index1;
            }
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode8(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._action[index0] = [address0, this._offset];
      return address0;
    },

    _read_label () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._label = this._cache._label || {};
      var cached = this._cache._label[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_noname_label();
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_named_label();
        if (address0 === FAILURE) {
          this._offset = index1;
        }
      }
      this._cache._label[index0] = [address0, this._offset];
      return address0;
    },

    _read_noname_label () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._noname_label = this._cache._noname_label || {};
      var cached = this._cache._noname_label[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      var chunk0 = null, max0 = this._offset + 1;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 !== null && /^[-+*]/.test(chunk0)) {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['text_parser::noname_label', '[-+*]']);
        }
      }
      if (address0 === FAILURE) {
        this._offset = index1;
        var index2 = this._offset, elements0 = new Array(2);
        var address1 = FAILURE;
        var index3 = this._offset, elements1 = [], address2 = null;
        while (true) {
          var chunk1 = null, max1 = this._offset + 1;
          if (max1 <= this._inputSize) {
            chunk1 = this._input.substring(this._offset, max1);
          }
          if (chunk1 !== null && /^[\d]/.test(chunk1)) {
            address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address2 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['text_parser::noname_label', '[\\d]']);
            }
          }
          if (address2 !== FAILURE) {
            elements1.push(address2);
          } else {
            break;
          }
        }
        if (elements1.length >= 1) {
          address1 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
          this._offset = this._offset;
        } else {
          address1 = FAILURE;
        }
        if (address1 !== FAILURE) {
          elements0[0] = address1;
          var address3 = FAILURE;
          var chunk2 = null, max2 = this._offset + 1;
          if (max2 <= this._inputSize) {
            chunk2 = this._input.substring(this._offset, max2);
          }
          if (chunk2 === '.') {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['text_parser::noname_label', '"."']);
            }
          }
          if (address3 !== FAILURE) {
            elements0[1] = address3;
          } else {
            elements0 = null;
            this._offset = index2;
          }
        } else {
          elements0 = null;
          this._offset = index2;
        }
        if (elements0 === null) {
          address0 = FAILURE;
        } else {
          address0 = new TreeNode(this._input.substring(index2, this._offset), index2, elements0);
          this._offset = this._offset;
        }
        if (address0 === FAILURE) {
          this._offset = index1;
        }
      }
      if (address0 !== FAILURE) {
        Object.assign(address0, this._types.NonameLabel);
      }
      this._cache._noname_label[index0] = [address0, this._offset];
      return address0;
    },

    _read_named_label () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._named_label = this._cache._named_label || {};
      var cached = this._cache._named_label[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_var_name();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var chunk0 = null, max0 = this._offset + 1;
        if (max0 <= this._inputSize) {
          chunk0 = this._input.substring(this._offset, max0);
        }
        if (chunk0 === '.') {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push(['text_parser::named_label', '"."']);
          }
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode13(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      if (address0 !== FAILURE) {
        Object.assign(address0, this._types.NamedLabel);
      }
      this._cache._named_label[index0] = [address0, this._offset];
      return address0;
    },

    _read_time_expr () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._time_expr = this._cache._time_expr || {};
      var cached = this._cache._time_expr[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_time_point();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        var index3 = this._offset, elements1 = new Array(2);
        var address3 = FAILURE;
        var chunk0 = null, max0 = this._offset + 2;
        if (max0 <= this._inputSize) {
          chunk0 = this._input.substring(this._offset, max0);
        }
        if (chunk0 === '..') {
          address3 = new TreeNode(this._input.substring(this._offset, this._offset + 2), this._offset, []);
          this._offset = this._offset + 2;
        } else {
          address3 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push(['text_parser::time_expr', '".."']);
          }
        }
        if (address3 !== FAILURE) {
          elements1[0] = address3;
          var address4 = FAILURE;
          address4 = this._read_time_point();
          if (address4 !== FAILURE) {
            elements1[1] = address4;
          } else {
            elements1 = null;
            this._offset = index3;
          }
        } else {
          elements1 = null;
          this._offset = index3;
        }
        if (elements1 === null) {
          address2 = FAILURE;
        } else {
          address2 = new TreeNode15(this._input.substring(index3, this._offset), index3, elements1);
          this._offset = this._offset;
        }
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2, []);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode14(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._time_expr[index0] = [address0, this._offset];
      return address0;
    },

    _read_time_point () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._time_point = this._cache._time_point || {};
      var cached = this._cache._time_point[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [], address1 = null;
      while (true) {
        var chunk0 = null, max0 = this._offset + 1;
        if (max0 <= this._inputSize) {
          chunk0 = this._input.substring(this._offset, max0);
        }
        if (chunk0 !== null && /^[\d]/.test(chunk0)) {
          address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address1 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push(['text_parser::time_point', '[\\d]']);
          }
        }
        if (address1 !== FAILURE) {
          elements0.push(address1);
        } else {
          break;
        }
      }
      if (elements0.length >= 1) {
        address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = FAILURE;
      }
      this._cache._time_point[index0] = [address0, this._offset];
      return address0;
    },

    _read_reminder () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._reminder = this._cache._reminder || {};
      var cached = this._cache._reminder[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 1;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === '!') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['text_parser::reminder', '"!"']);
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset;
        var index3 = this._offset, elements1 = new Array(2);
        var address3 = FAILURE;
        var index4 = this._offset;
        var chunk1 = null, max1 = this._offset + 1;
        if (max1 <= this._inputSize) {
          chunk1 = this._input.substring(this._offset, max1);
        }
        if (chunk1 !== null && /^[+-]/.test(chunk1)) {
          address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address3 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push(['text_parser::reminder', '[+-]']);
          }
        }
        if (address3 === FAILURE) {
          address3 = new TreeNode(this._input.substring(index4, index4), index4, []);
          this._offset = index4;
        }
        if (address3 !== FAILURE) {
          elements1[0] = address3;
          var address4 = FAILURE;
          var index5 = this._offset, elements2 = [], address5 = null;
          while (true) {
            var chunk2 = null, max2 = this._offset + 1;
            if (max2 <= this._inputSize) {
              chunk2 = this._input.substring(this._offset, max2);
            }
            if (chunk2 !== null && /^[\d]/.test(chunk2)) {
              address5 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
              this._offset = this._offset + 1;
            } else {
              address5 = FAILURE;
              if (this._offset > this._failure) {
                this._failure = this._offset;
                this._expected = [];
              }
              if (this._offset === this._failure) {
                this._expected.push(['text_parser::reminder', '[\\d]']);
              }
            }
            if (address5 !== FAILURE) {
              elements2.push(address5);
            } else {
              break;
            }
          }
          if (elements2.length >= 1) {
            address4 = new TreeNode(this._input.substring(index5, this._offset), index5, elements2);
            this._offset = this._offset;
          } else {
            address4 = FAILURE;
          }
          if (address4 !== FAILURE) {
            elements1[1] = address4;
          } else {
            elements1 = null;
            this._offset = index3;
          }
        } else {
          elements1 = null;
          this._offset = index3;
        }
        if (elements1 === null) {
          address2 = FAILURE;
        } else {
          address2 = new TreeNode(this._input.substring(index3, this._offset), index3, elements1);
          this._offset = this._offset;
        }
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(index2, index2), index2, []);
          this._offset = index2;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._reminder[index0] = [address0, this._offset];
      return address0;
    },

    _read_state () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._state = this._cache._state || {};
      var cached = this._cache._state[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(1);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 1;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === '[') {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['text_parser::state', '"["']);
        }
      }
      if (address1 !== FAILURE) {
        var address2 = FAILURE;
        address2 = this._read_state_value();
        if (address2 !== FAILURE) {
          elements0[0] = address2;
          var address3 = FAILURE;
          var chunk1 = null, max1 = this._offset + 1;
          if (max1 <= this._inputSize) {
            chunk1 = this._input.substring(this._offset, max1);
          }
          if (chunk1 === ']') {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['text_parser::state', '"]"']);
            }
          }
          if (address3 !== FAILURE) {
          } else {
            elements0 = null;
            this._offset = index1;
          }
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode16(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._state[index0] = [address0, this._offset];
      return address0;
    },

    _read_state_value () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._state_value = this._cache._state_value || {};
      var cached = this._cache._state_value[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      var chunk0 = null, max0 = this._offset + 1;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === ' ') {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['text_parser::state_value', '" "']);
        }
      }
      if (address0 === FAILURE) {
        this._offset = index1;
        var chunk1 = null, max1 = this._offset + 1;
        if (max1 <= this._inputSize) {
          chunk1 = this._input.substring(this._offset, max1);
        }
        if (chunk1 === 'x') {
          address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address0 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push(['text_parser::state_value', '"x"']);
          }
        }
        if (address0 === FAILURE) {
          this._offset = index1;
          var chunk2 = null, max2 = this._offset + 1;
          if (max2 <= this._inputSize) {
            chunk2 = this._input.substring(this._offset, max2);
          }
          if (chunk2 === 'X') {
            address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address0 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['text_parser::state_value', '"X"']);
            }
          }
          if (address0 === FAILURE) {
            this._offset = index1;
            address0 = this._read_var_name();
            if (address0 === FAILURE) {
              this._offset = index1;
            }
          }
        }
      }
      this._cache._state_value[index0] = [address0, this._offset];
      return address0;
    },

    _read_title () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._title = this._cache._title || {};
      var cached = this._cache._title[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      address1 = this._read_title_segment();
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset, elements1 = [], address3 = null;
        while (true) {
          var index3 = this._offset, elements2 = new Array(2);
          var address4 = FAILURE;
          var index4 = this._offset, elements3 = [], address5 = null;
          while (true) {
            address5 = this._read_space();
            if (address5 !== FAILURE) {
              elements3.push(address5);
            } else {
              break;
            }
          }
          if (elements3.length >= 0) {
            address4 = new TreeNode(this._input.substring(index4, this._offset), index4, elements3);
            this._offset = this._offset;
          } else {
            address4 = FAILURE;
          }
          if (address4 !== FAILURE) {
            elements2[0] = address4;
            var address6 = FAILURE;
            address6 = this._read_title_segment();
            if (address6 !== FAILURE) {
              elements2[1] = address6;
            } else {
              elements2 = null;
              this._offset = index3;
            }
          } else {
            elements2 = null;
            this._offset = index3;
          }
          if (elements2 === null) {
            address3 = FAILURE;
          } else {
            address3 = new TreeNode18(this._input.substring(index3, this._offset), index3, elements2);
            this._offset = this._offset;
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
          } else {
            break;
          }
        }
        if (elements1.length >= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = this._actions.make_title(this._input, index1, this._offset, elements0);
        this._offset = this._offset;
      }
      this._cache._title[index0] = [address0, this._offset];
      return address0;
    },

    _read_title_segment () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._title_segment = this._cache._title_segment || {};
      var cached = this._cache._title_segment[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      address0 = this._read_meta();
      if (address0 === FAILURE) {
        this._offset = index1;
        address0 = this._read_word_plus();
        if (address0 === FAILURE) {
          this._offset = index1;
        }
      }
      this._cache._title_segment[index0] = [address0, this._offset];
      return address0;
    },

    _read_tab () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._tab = this._cache._tab || {};
      var cached = this._cache._tab[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset;
      var chunk0 = null, max0 = this._offset + 1;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 === '\t') {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['text_parser::tab', '"\\t"']);
        }
      }
      if (address0 === FAILURE) {
        this._offset = index1;
        var chunk1 = null, max1 = this._offset + 4;
        if (max1 <= this._inputSize) {
          chunk1 = this._input.substring(this._offset, max1);
        }
        if (chunk1 === '    ') {
          address0 = new TreeNode(this._input.substring(this._offset, this._offset + 4), this._offset, []);
          this._offset = this._offset + 4;
        } else {
          address0 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push(['text_parser::tab', '"    "']);
          }
        }
        if (address0 === FAILURE) {
          this._offset = index1;
        }
      }
      this._cache._tab[index0] = [address0, this._offset];
      return address0;
    },

    _read_space () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._space = this._cache._space || {};
      var cached = this._cache._space[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var chunk0 = null, max0 = this._offset + 1;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 !== null && /^[^\S\r\n]/.test(chunk0)) {
        address0 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address0 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['text_parser::space', '[^\\S\\r\\n]']);
        }
      }
      this._cache._space[index0] = [address0, this._offset];
      return address0;
    },

    _read_word_plus () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._word_plus = this._cache._word_plus || {};
      var cached = this._cache._word_plus[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = [], address1 = null;
      while (true) {
        var index2 = this._offset, elements1 = new Array(2);
        var address2 = FAILURE;
        var index3 = this._offset;
        var chunk0 = null, max0 = this._offset + 1;
        if (max0 <= this._inputSize) {
          chunk0 = this._input.substring(this._offset, max0);
        }
        if (chunk0 !== null && /^[\s]/.test(chunk0)) {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
          this._offset = this._offset + 1;
        } else {
          address2 = FAILURE;
          if (this._offset > this._failure) {
            this._failure = this._offset;
            this._expected = [];
          }
          if (this._offset === this._failure) {
            this._expected.push(['text_parser::word_plus', '[\\s]']);
          }
        }
        this._offset = index3;
        if (address2 === FAILURE) {
          address2 = new TreeNode(this._input.substring(this._offset, this._offset), this._offset, []);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements1[0] = address2;
          var address3 = FAILURE;
          if (this._offset < this._inputSize) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['text_parser::word_plus', '<any char>']);
            }
          }
          if (address3 !== FAILURE) {
            elements1[1] = address3;
          } else {
            elements1 = null;
            this._offset = index2;
          }
        } else {
          elements1 = null;
          this._offset = index2;
        }
        if (elements1 === null) {
          address1 = FAILURE;
        } else {
          address1 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        }
        if (address1 !== FAILURE) {
          elements0.push(address1);
        } else {
          break;
        }
      }
      if (elements0.length >= 1) {
        address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      } else {
        address0 = FAILURE;
      }
      this._cache._word_plus[index0] = [address0, this._offset];
      return address0;
    },

    _read_var_name () {
      var address0 = FAILURE, index0 = this._offset;
      this._cache._var_name = this._cache._var_name || {};
      var cached = this._cache._var_name[index0];
      if (cached) {
        this._offset = cached[1];
        return cached[0];
      }
      var index1 = this._offset, elements0 = new Array(2);
      var address1 = FAILURE;
      var chunk0 = null, max0 = this._offset + 1;
      if (max0 <= this._inputSize) {
        chunk0 = this._input.substring(this._offset, max0);
      }
      if (chunk0 !== null && /^[A-Za-z]/.test(chunk0)) {
        address1 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
        this._offset = this._offset + 1;
      } else {
        address1 = FAILURE;
        if (this._offset > this._failure) {
          this._failure = this._offset;
          this._expected = [];
        }
        if (this._offset === this._failure) {
          this._expected.push(['text_parser::var_name', '[A-Za-z]']);
        }
      }
      if (address1 !== FAILURE) {
        elements0[0] = address1;
        var address2 = FAILURE;
        var index2 = this._offset, elements1 = [], address3 = null;
        while (true) {
          var chunk1 = null, max1 = this._offset + 1;
          if (max1 <= this._inputSize) {
            chunk1 = this._input.substring(this._offset, max1);
          }
          if (chunk1 !== null && /^[A-Za-z0-9_]/.test(chunk1)) {
            address3 = new TreeNode(this._input.substring(this._offset, this._offset + 1), this._offset, []);
            this._offset = this._offset + 1;
          } else {
            address3 = FAILURE;
            if (this._offset > this._failure) {
              this._failure = this._offset;
              this._expected = [];
            }
            if (this._offset === this._failure) {
              this._expected.push(['text_parser::var_name', '[A-Za-z0-9_]']);
            }
          }
          if (address3 !== FAILURE) {
            elements1.push(address3);
          } else {
            break;
          }
        }
        if (elements1.length >= 0) {
          address2 = new TreeNode(this._input.substring(index2, this._offset), index2, elements1);
          this._offset = this._offset;
        } else {
          address2 = FAILURE;
        }
        if (address2 !== FAILURE) {
          elements0[1] = address2;
        } else {
          elements0 = null;
          this._offset = index1;
        }
      } else {
        elements0 = null;
        this._offset = index1;
      }
      if (elements0 === null) {
        address0 = FAILURE;
      } else {
        address0 = new TreeNode(this._input.substring(index1, this._offset), index1, elements0);
        this._offset = this._offset;
      }
      this._cache._var_name[index0] = [address0, this._offset];
      return address0;
    }
  };

  var Parser = function(input, actions, types) {
    this._input = input;
    this._inputSize = input.length;
    this._actions = actions;
    this._types = types;
    this._offset = 0;
    this._cache = {};
    this._failure = 0;
    this._expected = [];
  };

  Parser.prototype.parse = function() {
    var tree = this._read_statements();
    if (tree !== FAILURE && this._offset === this._inputSize) {
      return tree;
    }
    if (this._expected.length === 0) {
      this._failure = this._offset;
      this._expected.push(['text_parser', '<EOF>']);
    }
    this.constructor.lastError = { offset: this._offset, expected: this._expected };
    throw new SyntaxError(formatError(this._input, this._failure, this._expected));
  };

  Object.assign(Parser.prototype, Grammar);


  function parse(input, options) {
    options = options || {};
    var parser = new Parser(input, options.actions, options.types);
    return parser.parse();
  }

  function formatError(input, offset, expected) {
    var lines = input.split(/\n/g),
        lineNo = 0,
        position = 0;

    while (position <= offset) {
      position += lines[lineNo].length + 1;
      lineNo += 1;
    }

    var line = lines[lineNo - 1],
        message = 'Line ' + lineNo + ': expected one of:\n\n';

    for (var i = 0; i < expected.length; i++) {
      message += '    - ' + expected[i][1] + ' from ' + expected[i][0] + '\n';
    }
    var number = lineNo.toString();
    while (number.length < 6) number = ' ' + number;
    message += '\n' + number + ' | ' + line + '\n';

    position -= line.length + 10;

    while (position < offset) {
      message += ' ';
      position += 1;
    }
    return message + '^';
  }

  function inherit(subclass, parent) {
    function chain () {};
    chain.prototype = parent.prototype;
    subclass.prototype = new chain();
    subclass.prototype.constructor = subclass;
  }


  var exported = { Grammar: Grammar, Parser: Parser, parse: parse };

  if (typeof require === 'function' && typeof exports === 'object') {
    Object.assign(exports, exported);
  } else {
    var ns = (typeof this === 'undefined') ? window : this;
    ns.text_parser = exported;
  }
})();
