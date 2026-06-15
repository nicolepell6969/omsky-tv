package com.omskytv.app.data.repository

import com.omskytv.app.data.mapper.toChannel
import com.omskytv.app.data.mapper.toStream
import com.omskytv.app.data.remote.IptvApi
import com.omskytv.app.domain.model.Channel
import com.omskytv.app.domain.model.Stream
import com.omskytv.app.domain.repository.ChannelRepository
import com.omskytv.app.util.Resource
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import retrofit2.HttpException
import java.io.IOException
import javax.inject.Inject

class ChannelRepositoryImpl @Inject constructor(
    private val api: IptvApi
) : ChannelRepository {

    private var cachedChannels: List<Channel>? = null
    private var cachedStreams: List<Stream>? = null

    override suspend fun getChannels(): Flow<Resource<List<Channel>>> = flow {
        emit(Resource.Loading())

        // Return cached data if available
        cachedChannels?.let {
            emit(Resource.Success(it))
            return@flow
        }

        try {
            val channels = api.getChannels()
                .filter { !it.isNsfw && it.closed == null }
                .map { it.toChannel() }
            
            cachedChannels = channels
            emit(Resource.Success(channels))
        } catch (e: HttpException) {
            emit(Resource.Error(e.localizedMessage ?: "An unexpected error occurred"))
        } catch (e: IOException) {
            emit(Resource.Error("Couldn't reach server. Check your internet connection."))
        }
    }

    override suspend fun getStreamsByChannel(channelId: String): Flow<Resource<List<Stream>>> = flow {
        emit(Resource.Loading())

        try {
            // Load all streams if not cached
            if (cachedStreams == null) {
                val streams = api.getStreams().map { it.toStream() }
                cachedStreams = streams
            }

            val channelStreams = cachedStreams?.filter { it.channel == channelId } ?: emptyList()
            emit(Resource.Success(channelStreams))
        } catch (e: HttpException) {
            emit(Resource.Error(e.localizedMessage ?: "An unexpected error occurred"))
        } catch (e: IOException) {
            emit(Resource.Error("Couldn't reach server. Check your internet connection."))
        }
    }

    override suspend fun getChannelById(channelId: String): Channel? {
        return cachedChannels?.find { it.id == channelId }
    }
}
