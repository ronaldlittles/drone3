import * as THREE from "three";
import EventEmitter from './EventEmitter.js'
import Experience from '../Experience.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader.js";
import { BasisTextureLoader } from 'three/examples/jsm/loaders/BasisTextureLoader.js'
import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader.js";
import { CubeTextureLoader, TextureLoader, VideoTexture } from 'three'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js"


export default class Resources extends EventEmitter
{
    /**
     * Constructor
     */
    constructor()
    {
        super()

        this.experience = new Experience()
        this.renderer = this.experience.renderer.instance

        this.setLoaders()

        this.toLoad = 0
        this.loaded = 0
        this.items = {}
    }

    /**
     * Set loaders
     */
    setLoaders()
    {
        this.loaders = []

        // Images
        this.loaders.push({
            extensions: ['jpg', 'png'],
            action: (_resource) =>
            {
                const image = new Image()

                image.addEventListener('load', () =>
                {
                    this.fileLoadEnd(_resource, image)
                })

                image.addEventListener('error', () =>
                {
                    this.fileLoadEnd(_resource, image)
                })

                image.src = _resource.source
            }
        })

        //Textures
        const textureLoader = new TextureLoader()
        
        this.loaders.push({
            extensions: ['jpg'],
            action: (_resource) =>
            {
                textureLoader.load(_resource.source, (_data) =>
                {
                    this.fileLoadEnd(_resource, _data)
                })
            }
        })

        // Basis images (depricated - read warning upon implementation)
        /*const basisLoader = new BasisTextureLoader()
        basisLoader.setTranscoderPath('basis/')
        basisLoader.detectSupport(this.renderer)

        this.loaders.push({
            extensions: ['basis'],
            action: (_resource) =>
            {
                basisLoader.load(_resource.source, (_data) =>
                {
                    this.fileLoadEnd(_resource, _data)
                })
            }
        })*/

                // Video

                
        /*const videoLoader = new  VideoTexture();

        this.loaders.push({
            extensions: ['mp4'],
            action: (_resource) =>
            {
                videoLoader.load(_resource.source, (_data) =>
                {
                    this.fileLoadEnd(_resource, _data);
                });
            }
        });*/  


        // Draco
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('draco/')
        dracoLoader.setDecoderConfig({ type: 'js' })

        this.loaders.push({
            extensions: ['drc'],
            action: (_resource) =>
            {
                dracoLoader.load(_resource.source, (_data) =>
                {
                    this.fileLoadEnd(_resource, _data)

                    DRACOLoader.releaseDecoderModule()
                })
            }
        })

    

        //FONT
        const fontLoader = new FontLoader()
        
       
        this.loaders.push({
            extensions: ['json'],
            action: (_resource) =>
            {
                fontLoader.load(_resource.source, (_data) =>
                {
                    this.fileLoadEnd(_resource, _data)
                })
            }
        })

        const ttfLoader = new TTFLoader()
        
       
        this.loaders.push({
            extensions: ['ttf'],
            action: (_resource) =>
            {
                ttfLoader.load(_resource.source, (_data) =>
                {
                    this.fileLoadEnd(_resource, _data)
                })
            }
        })



        


        // GLTF
        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)

        this.loaders.push({
            extensions: ['glb', 'gltf'],
            action: (_resource) =>
            {
                gltfLoader.load(_resource.source, (_data) =>
                {
                    this.fileLoadEnd(_resource, _data)
                })
            }
        })

        // FBX
        const fbxLoader = new FBXLoader()

        this.loaders.push({
            extensions: ['fbx'],
            action: (_resource) =>
            {
                fbxLoader.load(_resource.source, (_data) =>
                {
                    this.fileLoadEnd(_resource, _data)
                })
            }
        })

        // RGBE | HDR
        const rgbeLoader = new RGBELoader()

        this.loaders.push({
            extensions: ['hdr'],
            action: (_resource) =>
            {
                rgbeLoader.load(_resource.source, (_data) =>
                {
                    this.fileLoadEnd(_resource, _data)
                })
            }
        })

        const cubeTextureLoader = new CubeTextureLoader()
      
        this.loaders.push({
            extensions: ['png'],
            action: (_resource) =>
            {
               
                cubeTextureLoader.load(_resource.source, (_data) =>
                {
                    this.fileLoadEnd(_resource, _data)
                })
            }
        })
    }

    /**
     * Load
     */
    load(_resources = [])
    {
        for(const _resource of _resources)
        {
            this.toLoad++
            const extensionMatch = _resource.source.match(/\.([a-z]+)$/)

            if(typeof extensionMatch[1] !== 'undefined')
            {
                const extension = extensionMatch[1]
                const loader = this.loaders.find((_loader) => _loader.extensions.find((_extension) => _extension === extension))

                if(loader)
                {
                    loader.action(_resource)
                }
                else
                {
                    console.warn(`Cannot found loader for ${_resource}`)
                }
            }
            else
            {
                console.warn(`Cannot found extension of ${_resource}`)
            }
        }
    }

    /**
     * File load end
     */
    fileLoadEnd(_resource, _data)
    {
        this.loaded++
        this.items[_resource.name] = _data

        this.trigger('fileEnd', [_resource, _data])

        if(this.loaded === this.toLoad)
        {
            this.trigger('end')
        }
    }
}
