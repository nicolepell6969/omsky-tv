package com.omskytv.app.data.remote

import com.omskytv.app.data.remote.dto.ChannelDto
import com.omskytv.app.data.remote.dto.StreamDto
import retrofit2.http.GET
import retrofit2.http.Query

interface IptvApi {
    @GET("channels.json")
    suspend fun getChannels(): List<ChannelDto>

    @GET("streams.json")
    suspend fun getStreams(): List<StreamDto>

    companion object {
        const val BASE_URL = "https://iptv-org.github.io/api/"
    }
}
