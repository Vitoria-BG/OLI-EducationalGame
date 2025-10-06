package com.visioncameracolordetector

import android.graphics.Bitmap
import android.graphics.Color
import com.mrousavy.camera.frameprocessor.Frame
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin
import com.mrousavy.camera.frameprocessor.VisionCameraProxy

class ColorDetectorFrameProcessorPlugin(proxy: VisionCameraProxy, options: Map<String, Any>?) : FrameProcessorPlugin() {

    // The 'override' keyword is important!
    override fun callback(frame: Frame, params: Map<String, Any>?): Any? {
        // Ensure the image data is valid
        if (frame.image == null) {
            return null
        }

        try {
            // Convert the Frame to a Bitmap
            // Set isMirrored to false as we want the raw image
            val bitmap: Bitmap = frame.toBitmap()

            // Get the pixel from the center of the bitmap
            val centerX = bitmap.width / 2
            val centerY = bitmap.height / 2
            val pixel = bitmap.getPixel(centerX, centerY)

            // Extract RGB components from the pixel integer
            val r = Color.red(pixel)
            val g = Color.green(pixel)
            val b = Color.blue(pixel)

            // Format the result into a map to be returned to JS
            val colorMap = mapOf(
                "r" to r,
                "g" to g,
                "b" to b,
                "hex" to String.format("#%02X%02X%02X", r, g, b)
            )

            return colorMap
        } catch (e: Exception) {
            // Log any errors during processing
            e.printStackTrace()
            return null
        }
    }
}