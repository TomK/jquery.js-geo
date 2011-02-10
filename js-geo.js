/*
* jsGeo for jQuery
* Attach a button to any text element to get current location from navigator.geolocation
*
* Copyright (c) 2010 Tom Kay - oridan82@gmail.com
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.*
*
*/

;(function($){
	$(function () {
	if (navigator && navigator.geolocation) {
                $('.js-geo').each(function () {
			function jsGeoFind() {
				var updateBtn = this;
		                navigator.geolocation.getCurrentPosition(GetLocation);
		                function GetLocation(location) {
					if (!location.coords) return;
					var loc = location.coords.latitude+','+location.coords.longitude;
					if (location.address && location.address.postalCode)
						loc = location.address.postalCode;
					if (google && google.maps && google.maps.Geocoder) {
						var geo = new google.maps.Geocoder();
						var latLngObj = new google.maps.LatLng(location.coords.latitude,location.coords.longitude);
						geo.geocode({latLng:latLngObj},function (results,status) {
							if (status != google.maps.GeocoderStatus.OK) return;
							loc = results[0].formatted_address;
							$(updateBtn).prev('.js-geo').val(loc);
						});
						return;
					}
					$(updateBtn).prev('.js-geo').val(loc);
				}
			}
			var geoSize = 20;
			$(this).css('padding-right', parseInt($(this).css('padding-right')) + geoSize);
			$(this).css('width',$(this).width() - geoSize);
	                var l =	$(this).position().left + $(this).outerWidth(true) - geoSize - 2;
			var t = $(this).position().top + ($(this).outerHeight(true) /2) - 10;// $(this).position().top + parseInt($(this).css('border-top-width'));
	                $('<div class="js-geo-find"></div>').css({top:t,left:l}).insertAfter(this).click(jsGeoFind);
	        });
	}
	});
})(jQuery);
