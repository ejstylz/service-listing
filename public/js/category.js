const service = document.getElementById("service");
const category = document.getElementById("category");
const service2 = document.getElementById("service2");
const category2 = document.getElementById("category2");
const filters = document.getElementsByClassName("filters");
// const myText = document.getElementById("myText");
// const wordCount = document.getElementById("wordCount");
const create = document.getElementById("create");

service.onchange = function () {
    // console.log(service[1].value);
    if (service.value === "Outdoor Work") {
        $("#category").html("<option>--Select Service Category--</option> <option>Roofing Services</option> <option>Landscaping services</option> <option>Paving services</option> <option>Fencing services</option> <option>Junk Removal</option> <option>General Siding</option> <option>Exterior Painting</option> <option>Garage services</option> <option>Pools, Spas and Hot Tubs</option> <option>Masonry services</option>");
    } else if (service.value === "Indoor Work") {
        $("#category").html("<option>--Select Service Category--</option> <option>Plumbing Services</option> <option>HVAC Services</option> <option>Dry Wall & Insulation</option> <option>Pest Control</option> <option>General cleaning</option> <option>Interior Painting</option> <option>Window & Door Services</option> <option>Flooring Services</option> <option>General Remodeling</option> <option>Carpenters Services</option>");
    } else if (service.value === "Vehicle Services") {
        $("#category").html("<option>--Select Service Category--</option> <option>Towing Services</option> <option>Oil & Fluid Exchange</option> <option>Body Shop</option> <option>Mufflers & Exhaust Services</option> <option>Suspension Services</option> <option>Brake Change</option> <option>Alarm Installation</option> <option>Engine Diagnostic Services</option> <option>Heating & Cooling</option> <option>Wheel & Tire Services</option> <option>Check Engine Light</option> <option>Fleet Services</option> <option>Battery Services</option> <option>Window Tinting</option>");
    } else if (service.value === "Other Services") {
        $("#category").html("<option>--Select Service Category--</option> <option>General Handyman</option> <option>General Contractor</option> <option>Electrical Services</option> <option>Moving Services</option> <option>Building Security</option> <option>Demolition Services</option> <option>Appliance Repairs & Installation</option> <option>Locksmith Services</option>");
    } else {
        $("#category").html("<option>--Select Service Category--</option>");
    }
}

// service2.onchange = function () {
//     // console.log(service[1].value);
//     if (service2.value === "Outdoor Work") {
//         $("#category2").html("<option>--Select Service Category--</option> <option>Roofing Services</option> <option>Landscaping services</option> <option>Paving services</option> <option>Fencing services</option> <option>Junk Removal</option> <option>General Siding</option> <option>Exterior Painting</option> <option>Garage services</option> <option>Pools, Spas and Hot Tubs</option> <option>Masonry services</option>");
//     } else if (service2.value === "Indoor Work") {
//         $("#category2").html("<option>--Select Service Category--</option> <option>Plumbing Services</option> <option>HVAC Services</option> <option>Dry Wall & Insulation</option> <option>Pest Control</option> <option>General cleaning</option> <option>Interior Painting</option> <option>Window & Door Services</option> <option>Flooring Services</option> <option>General Remodeling</option> <option>Carpenters Services</option>");
//     } else if (service2.value === "Vehicle Services") {
//         $("#category2").html("<option>--Select Service Category--</option> <option>Towing Services</option> <option>Oil & Fluid Exchange</option> <option>Body Shop</option> <option>Mufflers & Exhaust Services</option> <option>Suspension Services</option> <option>Brake Change</option> <option>Alarm Installation</option> <option>Engine Diagnostic Services</option> <option>Heating & Cooling</option> <option>Wheel & Tire Services</option> <option>Check Engine Light</option> <option>Battery Services</option> <option>Window Tinting</option>");
//     } else if (service2.value === "Other Services") {
//         $("#category2").html("<option>--Select Service Category--</option> <option>General Handyman</option> <option>General Contractor</option> <option>Electrical Services</option> <option>Moving Services</option> <option>Building Security</option> <option>Demolition Services</option> <option>Appliance Repairs & Installation</option> <option>Locksmith Services</option>");
//     } else {
//         $("#category2").html("<option>--Select Service Category--</option>");
//     }
// }

category.onchange = function () {
    if (category.value === "Roofing Services") {
        $(".filters").html("<option>Inspection</option> <option>Repair</option> <option>Gutter & Downspout Cleaning or Maintenance</option> <option>Tuck Pointing</option> <option>Replace Roof Material</option>");
    }
    else if (category.value === "Landscaping services") {
        $(".filters").html("<option>Patio</option> <option>Walkaway</option> <option>Retaining Wall</option> <option>Artificial Turf</option> <option>Driveway</option> <option>Boulders or Stoners</option> <option>Water Features</option> <option>Arbor and Trellis</option> <option>Decking</option> <option>Porches</option> <option>Other Hardscape Services</option> <option>Lay Grass or Sod</option> <option>Lay Artificial Turf</option> <option>Plant Trees or Shrubs</option> <option>Trim Trees or Shrubs</option> <option>Remove Trees or Shrubs</option> <option>Plant Flower Beds</option> <option>Apply Mulch</option> <option>Install or Repair Sprinklers</option> <option>Install or Repair Drainage</option> <option>Install or Repair Outdoor Lighting</option> <option>Remove Tree Stumps</option> <option>Other Softscape Services</option>");
    }
    else if (category.value === "Paving services") {
        $(".filters").html("<option>Asphalt Installation</option> <option>Asphalt Repair or Maintenance</option> <option>Masonry Construction Services</option> <option>Paving Stone Contractors</option> <option>Cracks on Bricks/Stone</option> <option>Cracks in Mortar</option> <option>Water Leaking</option> <option>Leaning Structure</option> <option>Foundation Cracked</option> <option>Other</option>");
    }
    else if (category.value === "Fencing services") {
        $(".filters").html("<option>Repair</option> <option>Installation</option> <option>Material Repair</option>");
    }
    else if (category.value === "Junk Removal") {
        $(".filters").html("<option>Furniture, Appliances, or Electronics</option> <option>Yard Waste, Construction debris or scrap metal</option> <option>Mixed Trash</option> <option>Enough to fill half of a pickup truck</option> <option>Enough to fill one pickup truck</option> <option>Enough to fill two pickup trucks</option> <option>Enough to fill three pickup trucks</option> <option>Enough to fill four pickup trucks</option>");
    }
    else if (category.value === "General Siding") {
        $(".filters").html("<option>Wood</option> <option>Vinyl</option> <option>Metal</option> <option>Fiber Cement</option> <option>Masonry Siding (Brick, Stucco, Stone)</option> <option>Need a professional's help to decide</option>");
    }
    else if (category.value === "Exterior Painting") {
        $(".filters").html("<option>Exterior Painting</option>");
    }
    else if (category.value === "Garage services") {
        $(".filters").html("<option>Installation</option> <option>Repair</option> <option>Remodeling</option>");
    }
    else if (category.value === "Pools, Spas and Hot Tubs") {
        $(".filters").html("<option>Cleaning/Maintenance/Inspection</option> <option>installation</option> <option>Repairs</option>");
    }

    else if (category.value === "Masonry services") {
        $(".filters").html("<option>Repairs</option> <option>Installation</option>");
    }

    else if (category.value === "Plumbing Services") {
        $(".filters").html("<option>Repair</option> <option>Installation</option> <option>Inspection</option> <option>Cleaning</option>");
    }

    else if (category.value === "HVAC Services") {
        $(".filters").html("<option>Central Air Conditioning</option> <option>Duct And Vent Cleaning</option>");
    }

    else if (category.value === "Dry Wall & Insulation") {
        $(".filters").html("<option>Dry Wall & Insulation</option>");
    }

    else if (category.value === "Pest Control") {
        $(".filters").html("<option>Rodents</option> <option>Cockroaches</option> <option>Ants</option> <option>Bed Bugs</option> <option>Fleas or Mites</option> <option>Bees</option> <option>Spiders</option> <option>Hornets or Wasps</option> <option>Mosquitoes</option> <option>Ticks</option>");
    }

    else if (category.value === "General cleaning") {
        $(".filters").html("<option>House Cleaning</option> <option>Carpet Cleaning</option> <option>Window Cleaning</option> <option>Office Cleaning</option>");
    }

    else if (category.value === "Interior Painting") {
        $(".filters").html("<option>Yes this is a new construction</option> <option>No this is not a new construction</option>");
    }

    else if (category.value === "Window & Door Services") {
        $(".filters").html("<option>Installation</option> <option>Repair</option> <option>Cleaning</option>");
    }

    else if (category.value === "Flooring Services") {
        $(".filters").html("<option>Installation</option> <option>Repair</option> <option>Cleaning</option>");
    }

    else if (category.value === "General Remodeling") {
        $(".filters").html("<option>General Remodeling</option>");
    }

    else if (category.value === "Carpenters Services") {
        $(".filters").html("<option>Cabinets, Shelves, or bookcases</option> <option>Outdoor animal enclosure</option> <option>Walls</option> <option>Door</option> <option>Deck, Porch, or Balcony</option> <option>Furniture</option> <option>Stairs</option> <option>Windows</option> <option>Garage, carport, or shed</option> <option>Tiling</option> <option>Installation</option> <option>Repair</option>");
    }

    else if (category.value === "Towing Services") {
        $(".filters").html("<option>Towing Services</option>");
    }
    else if (category.value === "Oil & Fluid Exchange") {
        $(".filters").html("<option>Oil & Fluid Exchange</option>");
    }
    else if (category.value === "Body Shop") {
        $(".filters").html("<option>Body Shop</option>");
    }
    else if (category.value === "Mufflers & Exhaust Services") {
        $(".filters").html("<option>Mufflers & Exhaust Services</option>");
    }
    else if (category.value === "Suspension Services") {
        $(".filters").html("<option>Suspension Services</option>");
    }
    else if (category.value === "Brake Change") {
        $(".filters").html("<option>Brake Change</option>");
    }
    else if (category.value === "Alarm Installation") {
        $(".filters").html("<option>Alarm Installation</option>");
    }
    else if (category.value === "Engine Diagnostic Services") {
        $(".filters").html("<option>Engine Diagnostic Services</option>");
    }
    else if (category.value === "Heating & Cooling") {
        $(".filters").html("<option>Heating & Cooling</option>");
    }
    else if (category.value === "Wheel & Tire Services") {
        $(".filters").html("<option>Wheel & Tire Services</option>");
    }
    else if (category.value === "Check Engine Light") {
        $(".filters").html("<option>Check Engine Light</option>");
    }
    else if (category.value === "Battery Services") {
        $(".filters").html("<option>Battery Services</option>");
    }
    else if (category.value === "Window Tinting") {
        $(".filters").html("<option>Window Tinting</option>");
    }
    else if (category.value === "Fleet Services") {
        $(".filters").html("<option>Fleet Services</option>");
    }
    else if (category.value === "General Handyman") {
        $(".filters").html("<option>Repairs</option> <option>Maintenance</option> <option>Painting</option> <option>Installation</option> <option>Assembly</option> <option>Cleaning</option> <option>Other</option> <option>Need to talk to a pro</option> <option>Doors</option> <option>Walls</option> <option>Cabinets</option> <option>Molding or baseboards</option> <option>Tiling</option> <option>Plumbing</option> <option>Lighting</option> <option>Furniture</option> <option>Windows</option> <option>Gutters</option> <option>Shelving</option> <option>Flooring</option> <option>Appliances</option> <option>Electrical</option> <option>Wall hanging</option> <option>Other</option>");
    }
    else if (category.value === "General Contractor") {
        $(".filters").html("<option>New Custom Construction</option> <option>Complete Renovation</option> <option>Replace parts of the existing structure</option> <option>Repair existing structure</option>");
    }
    else if (category.value === "Electrical Services") {
        $(".filters").html("<option>Electrical & Wiring Repair</option> <option>Lighting Installation</option> <option>Fan Installation</option> <option>Switch and Outlet Repair</option> <option>Switch and Outlet Installation</option>");
    }
    else if (category.value === "Moving Services") {
        $(".filters").html("<option>Furniture assembly and disassembly</option> <option>Storage</option> <option>Piano Moving</option> <option>Pool table moving</option> <option>Packing</option> <option>Equipment Moving</option> <option>Safe or Security Box Mobinh</option> <option>Automobile moving</option>");
    }
    else if (category.value === "Building Security") {
        $(".filters").html("<option>Cameras</option> <option>Surveillance System</option> <option>Remote Viewing</option> <option>Motion detectors</option> <option>Video Doorbell</option> <option>Window and Door Sensors</option> <option>As recommended by a pro</option> <option>Other</option>");
    }
    else if (category.value === "Demolition Services") {
        $(".filters").html("<option>Total Demolition</option> <option>Partial Demolition</option> <option>Strip Out Interior</option> <option>Pool Demolition</option>");
    }
    else if (category.value === "Appliance Repairs & Installation") {
        $(".filters").html("<option>Washer</option> <option>Dryer</option> <option>Refigerator</option> <option>Dishwasher</option> Oven/Stove</option> <option>Microwave</option> <option>Other, I need to talk to a pro</option>");
    }
    else if (category.value === "Locksmith Services") {
        $(".filters").html("<option>A lost key</option> <option>need a replacement key</option> <option>Install or replace current lock system</option> <option>Locked Out</option> <option>Re-Key Lock for different keys to work</option> <option>Repair Broken Lock</option> <option>Copy Keys</option> <option>Deadbolt</option> <option>Vehicle Lock</option> <option>Doorknob</option> <option>Mailbox</option> <option>Office furniture</option> <option>Electronic combination pad<//option> <option>Keyless remote</option> <option>Other</option>");
    }
    else {
        $("#category").html("<option>--Select Filter--</option>");
    }
}


function addRow() {
    const div = document.createElement('div');

    div.className = 'form-row';

    div.innerHTML = create.innerHTML;
    document.getElementById('content').appendChild(div);
}

function removeRow(input) {
    document.getElementById('content').removeChild(input.parentNode.parentNode);
}