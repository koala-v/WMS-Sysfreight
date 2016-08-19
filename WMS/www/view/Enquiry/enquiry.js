appControllers.controller( 'EnquiryListCtrl', [
    'ENV',
    '$scope',
    '$stateParams',
    '$state',
    '$cordovaKeyboard',
    'ApiService',
    function (
        ENV,
        $scope,
        $stateParams,
        $state,
        $cordovaKeyboard,
        ApiService ) {
        $scope.Impr1 = {};
        $scope.Impm1 = {};
        $scope.Impm1sEnquiry = {};
        $scope.refreshImpr1 = function ( ProductCode ) {
            if ( is.not.undefined( ProductCode ) && is.not.empty( ProductCode ) ) {
                var objUri = ApiService.Uri( true, '/api/wms/impr1' );
                objUri.addSearch( 'ProductCode', ProductCode );
                ApiService.Get( objUri, false ).then( function success( result ) {
                    $scope.Impr1s = result.data.results;
                } );
            } else {
                $scope.showImpm( null, null );
            }
        };
        $scope.refreshImpm1s = function ( UserDefine1 ) {
            if ( is.not.undefined( UserDefine1 ) && is.not.empty( UserDefine1 ) ) {
                var objUri = ApiService.Uri( true, '/api/wms/impm1' );
                objUri.addSearch( 'UserDefine1', UserDefine1 );
                ApiService.Get( objUri, false ).then( function success( result ) {
                    $scope.Impm1s = result.data.results;
                } );
            } else {
                $scope.showImpm( null, null );
            }
        };
        $scope.showDate = function ( utc ) {
            return moment( utc ).format( 'DD-MMM-YYYY' );
        };
        $scope.returnMain = function () {
            $state.go( 'index.main', {}, {
                reload: true
            } );
        };
        $scope.scanFlag = { checked: false };
        $scope.scanChange= function () {

        };

        $scope.clearInput = function ( type ) {
          if ( is.equal( type, 'ProductCode' ) ) {
              if ( Impr1.selected.ProductCode='';
              }
          }
          if ( is.equal( type, 'ProductCode' ) ) {
              if ( Impr1.selected.ProductCode='';
              }
          }
        };

        $scope.enter = function ( ev, type ) {
            if ( is.equal( ev.keyCode, 13 ) ) {
                // if ( is.equal( type, 'barcode' ) && is.not.empty( $scope.Detail.Scan.BarCode ) ) {
                //     if ( blnVerifyInput( 'BarCode' ) ) {
                //         showImpr( $scope.Detail.Scan.BarCode );
                //     }
                // } else if ( is.equal( type, 'serialno' ) && is.not.empty( $scope.Detail.Scan.StoreNo ) ) {
                //     if ( blnVerifyInput( 'SerialNo' ) ) {
                //         showSn( $scope.Detail.SerialNo );
                //     }
                // } else if ( is.equal( type, 'storeno' ) && is.not.empty( $scope.Detail.Scan.StoreNo ) ) {
                //     if ( blnVerifyInput( 'StoreNo' ) ) {
                //         $( '#txt-barcode' ).focus();
                //     }
                // }
                if ( !ENV.fromWeb ) {
                    $cordovaKeyboard.close();
                }
            }
        };

        $scope.openCam = function ( type ) {
            if ( !ENV.fromWeb ) {
                if ( is.equal( type, 'StoreNo' ) ) {
                    $cordovaBarcodeScanner.scan().then( function ( imageData ) {
                        $scope.Detail.Scan.StoreNo = imageData.text;
                    }, function ( error ) {
                        $cordovaToast.showShortBottom( error );
                    } );
                } else if ( is.equal( type, 'BarCode' ) ) {
                    $cordovaBarcodeScanner.scan().then( function ( imageData ) {
                        $scope.Detail.Scan.BarCode = imageData.text;
                        showImpr( $scope.Detail.Scan.BarCode, true );
                    }, function ( error ) {
                        $cordovaToast.showShortBottom( error );
                    } );
                } else if ( is.equal( type, 'SerialNo' ) ) {
                    //if ($('#txt-sn').attr("readonly") != "readonly") {
                    $cordovaBarcodeScanner.scan().then( function ( imageData ) {
                        $scope.Detail.Scan.SerialNo = imageData.text;
                        showSn( $scope.Detail.Scan.SerialNo, false );
                    }, function ( error ) {
                        $cordovaToast.showShortBottom( error );
                    } );
                    //}
                }
            }
        };

        $scope.funcRoleJuage = function (roleType) {
                    if (roleType === 1) {
                        if ($scope.scanFlag.checked) {
                            return false;
                        } else {
                            return true;
                        }
                    } else if (roleType === 2) {
                      if ($scope.scanFlag.checked) {
                          return true;
                      } else {
                          return false;
                      }
                    }
                };

        $scope.showImpm = function ( ProductCode, Impm1 ) {
            if ( is.not.undefined( ProductCode ) && is.not.null( ProductCode ) ) {
                var objUri = ApiService.Uri( true, '/api/wms/impm1/enquiry' );
                objUri.addSearch( 'ProductCode', ProductCode );
                ApiService.Get( objUri, false ).then( function success( result ) {
                    $scope.Impm1sEnquiry = result.data.results;
                } );
            } else if ( is.not.undefined( Impm1 ) && is.not.null( Impm1 ) ) {
                var objUri = ApiService.Uri( true, '/api/wms/impm1/enquiry' );
                objUri.addSearch( 'TrxNo', Impm1.TrxNo );
                ApiService.Get( objUri, false ).then( function success( result ) {
                    $scope.Impm1sEnquiry = result.data.results;
                } );
            } else {
                $scope.Impm1sEnquiry = {};
            }
            if(!ENV.fromWeb){
                $cordovaKeyboard.close();
            }
        };
    }
] );
