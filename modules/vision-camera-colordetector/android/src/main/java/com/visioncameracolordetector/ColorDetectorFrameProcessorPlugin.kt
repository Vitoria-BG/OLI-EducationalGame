package com.visioncameracolordetector

import android.graphics.Bitmap
import android.graphics.Color
import android.graphics.ImageFormat
import android.graphics.Rect
import android.graphics.YuvImage
import android.media.Image
import com.mrousavy.camera.frameprocessors.Frame
import com.mrousavy.camera.frameprocessors.FrameProcessorPlugin
import com.mrousavy.camera.frameprocessors.VisionCameraProxy
import java.io.ByteArrayOutputStream
import java.nio.ByteBuffer

class ColorDetectorFrameProcessorPlugin(proxy: VisionCameraProxy, options: Map<String, Any>?) : FrameProcessorPlugin() {

    override fun callback(frame: Frame, params: Map<String, Any>?): Any? {
        try {
            // Get the image from the frame
            val image = frame.getImage()
            
            // Convert Image to Bitmap
            val bitmap = imageToBitmap(image)
            
            if (bitmap == null) {
                return null
            }

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

    private fun imageToBitmap(image: Image): Bitmap? {
        return try {
            val planes = image.planes
            val buffer = planes[0].buffer
            val pixelStride = planes[0].pixelStride
            val rowStride = planes[0].rowStride
            val rowPadding = rowStride - pixelStride * image.width

            val bitmap = Bitmap.createBitmap(
                image.width + rowPadding / pixelStride,
                image.height,
                Bitmap.Config.ARGB_8888
            )
            bitmap.copyPixelsFromBuffer(buffer)
            
            // Crop to remove padding if needed
            if (rowPadding > 0) {
                Bitmap.createBitmap(bitmap, 0, 0, image.width, image.height)
            } else {
                bitmap
            }
        } catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}