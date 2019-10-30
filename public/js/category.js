const service = document.getElementById("service");
const category = document.getElementById("category");

service.onchange = function () {
    // console.log(service[1].value);
    if (service.value === "Outdoor Work") {
        $("#category").html("<option>--Select Service Category--</option> <option>Roofing Services</option> <option>Landscaping services</option> <option>Paving services</option> <option>Fencing services</option> <option>Junk Removal</option> <option>General Siding</option> <option>Exterior Painting</option> <option>Garage services</option> <option>Pools, Spas and Hot Tubs</option> <option>Masonry services</option>");
    } else if (service.value === "Indoor Work") {
        $("#category").html("<option>--Select Service Category--</option> <option>Plumbing Services</option> <option>HVAC Services</option> <option>Dry Wall & Insulation</option> <option>Pest Control</option> <option>General cleaning</option> <option>Interior Painting</option> <option>Window & Door Services</option> <option>Flooring Services</option> <option>General Remodeling</option> <option>Carpenters Services</option>");
    } else if (service.value === "Vehicle Services") {
        $("#category").html("<option>--Select Service Category--</option> <option>Towing Services</option> <option>Oil & Fluid Exchange</option> <option>Body Shop</option> <option>Mufflers & Exhaust Services</option> <option>Suspension Services</option> <option>Brake Change</option> <option>Alarm Installation</option> <option>Engine Diagnostic Services</option> <option>Heating & Cooling</option> <option>Wheel & Tire Services</option> <option>Check Engine Light</option> <option>Battery Services</option> <option>Window Tinting</option>");
    } else if (service.value === "Other Services") {
        $("#category").html("<option>--Select Service Category--</option> <option>General Handyman</option> <option>General Contractor</option> <option>Electrical Services</option> <option>Moving Services</option> <option>Building Security</option> <option>Demolition Services</option> <option>Appliance Repairs & Installation</option> <option>Locksmith Services</option>");
    } else {
        $("#category").html("<option>--Select Service Category--</option>");
    }
}