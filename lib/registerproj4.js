import { register } from "ol/proj/proj4";
import proj4 from "proj4";


export const register_32647 = () => {
    proj4.defs("EPSG:32647", "+proj=utm +zone=47 +datum=WGS84 +units=m +no_defs");
    register(proj4)
}

export const register_24047 = () => {
    proj4.defs("EPSG:24047", "+proj=utm +zone=47 +a=6377276.345 +b=6356075.41314024 +towgs84=204.4789,837.8940,294.7765,0,0,0,0 +units=m +no_defs");
    register(proj4)
}

export const register_24048 = () => {
    proj4.defs("EPSG:24048", "+proj=utm +zone=48 +ellps=evrst30 +towgs84=293,836,318,0.5,1.6,-2.8,2.1 +units=m +no_defs +type=crs");
    register(proj4)
}